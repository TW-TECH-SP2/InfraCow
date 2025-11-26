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
    const { nome_animal, codigo, genero, tipo, raca, peso, idade, fazenda_id, codigo_rfid } = req.body;
    const usuario_id = req.usuarioLogado.id;
    const imagem = req.file ? req.file.filename : null;

    console.log('📝 Criando animal:', { nome_animal, codigo, genero, tipo, raca, peso, idade, fazenda_id, usuario_id });

    if (!nome_animal || !codigo || !genero || !tipo || !raca || !peso || !idade || !fazenda_id) {
      console.log('❌ Campos faltando');
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    // valida código numérico
    const codigoStr = String(codigo).trim();
    if (isNaN(Number(codigoStr))) {
      return res.status(400).json({ error: 'O campo codigo deve ser numérico' });
    }

    console.log('🔎 Validando fazenda para criação:', { fazenda_id, usuario_id });
    const fazenda = await Fazenda.findOne({ where: { id: fazenda_id, usuario_id } });

    if(!fazenda) {
      console.log('❌ Fazenda não encontrada ou sem permissão:', { fazenda_id, usuario_id });
      return res.status(403).json({ error: "Você não tem permissão para adicionar animais nesta fazenda!", detalhes: { fazenda_id, usuario_id } });
    }

    console.log('✅ Fazenda validada, criando animal...');
    const novoAnimal = await animalService.create({
      nome_animal,
      codigo: codigoStr,
      codigo_rfid: codigo_rfid ? String(codigo_rfid).trim().toUpperCase() : null,
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

const updateAnimal = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuario_id = req.usuarioLogado.id;
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID Inválido" });
    }
    const imagem = req.file ? req.file.filename : undefined;
    const { nome_animal, codigo, genero, tipo, raca, peso, idade, codigo_rfid } = req.body;

    if (codigo !== undefined && codigo !== null) {
      const codigoStr = String(codigo).trim();
      if (codigoStr.length && isNaN(Number(codigoStr))) {
        return res.status(400).json({ error: 'O campo codigo deve ser numérico' });
      }
    }

    const atualizado = await animalService.update(
      id, usuario_id, {
        nome_animal,
        codigo: codigo !== undefined ? String(codigo).trim() : undefined,
        codigo_rfid: codigo_rfid ? String(codigo_rfid).trim().toUpperCase() : undefined,
        genero,
        tipo,
        raca,
        peso,
        idade,
        imagem,
      }
    );
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
