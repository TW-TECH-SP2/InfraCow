import Medicao from '../models/Medicoes.js';

import Animais from '../models/Animais.js';

// Recebe dados de temperatura do IoT e salva no banco
export const cadastrarTemperatura = async (req, res) => {
  try {
    const { temperatura, codigo } = req.body;
    console.log('Recebendo POST /iot/temperature');
    console.log('Dados recebidos:', req.body);
    if (!temperatura || !codigo) {
      console.log('❌ Temperatura e codigo são obrigatórios');
      return res.status(400).json({ erro: 'Temperatura e codigo são obrigatórios.' });
    }
    // Buscar animal pelo codigo
    const animal = await Animais.findOne({ where: { codigo } });
    if (!animal) {
      console.log('❌ Animal não encontrado para o código:', codigo);
      return res.status(404).json({ erro: 'Animal não encontrado para o código informado.' });
    }
    const novaMedicao = await Medicao.create({
      temperatura,
      animais_id: animal.id,
      data_medicao: new Date()
    });
    console.log('✅ Temperatura cadastrada com sucesso:', novaMedicao);
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
