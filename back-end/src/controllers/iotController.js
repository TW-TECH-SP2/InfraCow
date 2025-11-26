import Medicao from '../models/Medicoes.js';

import Animais from '../models/Animais.js';

// Recebe dados de temperatura do IoT e salva no banco
export const cadastrarTemperatura = async (req, res) => {
  try {
    const { temperatura, codigo, codigo_rfid, datahora, data_medicao } = req.body;
    console.log('Recebendo POST /iot/temperature');
    console.log('Dados recebidos:', req.body);

    // prioridade para campo explicito codigo_rfid
    let codigoEntrada = codigo_rfid || codigo;
    // normaliza: string, trim e maiúsculas para RFID alfanumérico
    if (codigoEntrada !== undefined && codigoEntrada !== null) {
      codigoEntrada = String(codigoEntrada).trim();
    }
    if (temperatura === undefined || !codigoEntrada) {
      console.log('❌ temperatura e codigo_rfid/codigo são obrigatórios');
      return res.status(400).json({ erro: 'Campos obrigatórios: temperatura e codigo (ou codigo_rfid).' });
    }

    // Buscar animal: tenta primeiro RFID alfanumérico
    // tenta por RFID (comparando com maiúsculas, se aplicável)
    let animal = await Animais.findOne({ where: { codigo_rfid: String(codigoEntrada).toUpperCase() } });
    // fallback: tenta com valor original (caso base esteja salvo em minúsculo)
    if (!animal) {
      animal = await Animais.findOne({ where: { codigo_rfid: String(codigoEntrada) } });
    }
    // se for numérico, tenta coluna codigo
    if (!animal && !isNaN(Number(codigoEntrada))) {
      animal = await Animais.findOne({ where: { codigo: Number(codigoEntrada) } });
    }
    if (!animal) {
      console.log('❌ Animal não encontrado para o código:', codigoEntrada);
      return res.status(404).json({ erro: 'Animal não encontrado para o código informado.' });
    }

    // Definir timestamp: se dispositivo enviou datahora ou data_medicao válida, usar; senão usar server time
    let timestampStr = datahora || data_medicao;
    let timestamp;
    if (timestampStr) {
      // Aceita ISO ou epoch numérico
      if (!isNaN(Number(timestampStr))) {
        const epoch = Number(timestampStr);
        // epoch em segundos ou ms? se for < 10^12 assume segundos
        timestamp = new Date(epoch < 1e12 ? epoch * 1000 : epoch);
      } else {
        const parsed = Date.parse(timestampStr);
        if (!isNaN(parsed)) timestamp = new Date(parsed);
      }
    }
    if (!timestamp) timestamp = new Date();

    const novaMedicao = await Medicao.create({
      temperatura,
      animais_id: animal.id,
      data_medicao: timestamp
    });
    console.log('✅ Temperatura cadastrada com sucesso:', {
      id: novaMedicao.id,
      temperatura: novaMedicao.temperatura,
      data_medicao: novaMedicao.data_medicao,
      animal: animal.id
    });
    res.status(201).json(novaMedicao);
  } catch (err) {
    console.error('❌ Erro ao cadastrar temperatura:', err.message);
    res.status(500).json({ erro: 'Erro ao cadastrar temperatura', detalhes: err.message });
  }
};

// Retorna as últimas medições cadastradas (para teste)
export const listarUltimasMedicoes = async (req, res) => {
  try {
    const medicoes = await Medicao.findAll({
      limit: 10,
      order: [['data_medicao', 'DESC']],
      include: [{ model: Animais, attributes: ['nome_animal', 'codigo'] }]
    });
    console.log('✅ Listando últimas 10 medições');
    res.status(200).json(medicoes);
  } catch (err) {
    console.error('❌ Erro ao listar medições:', err.message);
    res.status(500).json({ erro: 'Erro ao listar medições', detalhes: err.message });
  }
};
