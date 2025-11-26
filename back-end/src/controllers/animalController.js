import animalService from "../services/animalService.js";
import Fazenda from "../models/Fazenda.js";

const getAllAnimais = async (req, res) => {
  try {
    const usuario_id = req.usuarioLogado.id;
    const animais = await animalService.getAll(usuario_id);
    // Força inclusão explícita de codigo_rfid no JSON
    const lista = animais.map(a => {
      const obj = a.toJSON();
      obj.codigo_rfid = a.codigo_rfid || null;
      return obj;
    });
    return res.status(200).json({ animais: lista });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const createAnimal = async (req, res) => {
  try {
    // Aceita tanto codigo quanto codigo_rfid do formulário; trata codigo como RFID se alfanumérico
    const { nome_animal, codigo, codigo_rfid, genero, tipo, raca, peso, idade, fazenda_id } = req.body;
    const usuario_id = req.usuarioLogado.id;
    const imagem = req.file ? req.file.filename : null;

    console.log('📝 Criando animal (RFID exigido):', { nome_animal, codigo_rfid, genero, tipo, raca, peso, idade, fazenda_id, usuario_id });

    // Exige codigo_rfid sempre; codigo numérico será padronizado para '0'
    if (!nome_animal || (!codigo_rfid && !codigo) || !genero || !tipo || !raca || !peso || !idade || !fazenda_id) {
      console.log('❌ Campos faltando');
      return res.status(400).json({ error: "Preencha todos os campos (incluir RFID)" });
    }

    const fazenda = await Fazenda.findOne({ where: { id: fazenda_id, usuario_id } });

    if(!fazenda) {
      console.log('❌ Fazenda não encontrada ou sem permissão:', { fazenda_id, usuario_id });
      return res.status(403).json({ error: "Você não tem permissão para adicionar animais nesta fazenda!" });
    }

    // Normaliza RFID (maiúsculas, sem espaços) e força codigo=0
    let rawRfid = codigo_rfid || codigo; // prioridade ao codigo_rfid se vier
    rawRfid = String(rawRfid).trim().toUpperCase();
    if (!rawRfid.length) {
      return res.status(400).json({ error: 'RFID vazio' });
    }
    const finalCodigoRfid = rawRfid;
    const finalCodigo = '0'; // sempre 0

    console.log('✅ Fazenda validada, criando animal...');
    const novoAnimal = await animalService.create({
      nome_animal,
      codigo: finalCodigo,
      codigo_rfid: finalCodigoRfid,
      genero,
      tipo,
      raca,
      peso,
      idade,
      fazenda_id,
      imagem, 
    });
    console.log('✅ Animal criado com sucesso:', novoAnimal.id);
    return res.status(201).json({ message: "Animal registrado com sucesso!", animal: novoAnimal });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const deleteAnimal = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuario_id = req.usuarioLogado.id;
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const apagado = await animalService.delete(id, usuario_id);
    if (apagado) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ error: "Animal não encontrado ou sem permissão!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

        const out = novoAnimal.toJSON();
        out.codigo_rfid = finalCodigoRfid;
        return res.status(201).json({ message: "Animal registrado com sucesso!", animal: out });
  try {
    const id = parseInt(req.params.id);
    const usuario_id = req.usuarioLogado.id;
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID Inválido" });
    }
    const imagem = req.file ? req.file.filename : undefined;
    const { nome_animal, codigo, codigo_rfid, genero, tipo, raca, peso, idade } = req.body;
    // Se veio apenas codigo, trata como RFID
    const rfidFinal = (codigo_rfid || codigo) ? String((codigo_rfid || codigo)).trim().toUpperCase() : undefined;
    const atualizado = await animalService.update(
      id, usuario_id, {
      nome_animal,
      codigo: '0',
      codigo_rfid: rfidFinal,
      genero,
      tipo,
      raca,
      peso,
      idade,
      imagem,
    });
    if (atualizado) {
      return res.status(200).json({ message: "Animal atualizado com sucesso!" });
    } else {
      return res.status(404).json({ error: "Animal não encontrado" });
    }
  } catch (error) {
    console.log("Erro ao atualizar animal", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const getOneAnimal = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuario_id = req.usuarioLogado.id;
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID Inválido" });
    }
    const animal = await animalService.getOne(id, usuario_id);

    if (!animal) {
      return res.status(404).json({ error: "Animal não encontrado ou sem permissão" });
    } else {
      const obj = animal.toJSON();
      obj.codigo_rfid = animal.codigo_rfid || null;
      return res.status(200).json({ animal: obj });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const getAnimaisByFazenda = async (req, res) => {
  try {
    const fazendaId = parseInt(req.params.id);
    const usuario_id = req.usuarioLogado.id;
    if (isNaN(fazendaId)) {
      return res.status(400).json({ error: "Id de fazenda inválido " });
    }
    const animais = await animalService.getByFazendaId(fazendaId, usuario_id);
    if (!animais || animais.length === 0) {
      return res.status(404).json({ message: "Nenhum animal encontrado nesta fazenda" });
    }

    return res.status(200).json({ animais });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export default {
  getAllAnimais,
  createAnimal,
  deleteAnimal,
  updateAnimal,
  getOneAnimal,
  getAnimaisByFazenda,
  // método interno para rota de debug de RFIDs
  _rawListRFID: async (usuario_id) => {
    const animais = await animalService.getAll(usuario_id);
    return animais.map(a => ({ id: a.id, codigo_rfid: a.codigo_rfid || null }));
  }
};
