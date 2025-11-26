import animalService from "../services/animalService.js";
import Fazenda from "../models/Fazenda.js";

const getAllAnimais = async (req, res) => {
  try {
    const usuario_id = req.usuarioLogado.id;
    const animais = await animalService.getAll(usuario_id);
    return res.status(200).json({ animais });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const createAnimal = async (req, res) => {
  try {
    const { nome_animal, codigo, genero, tipo, raca, peso, idade, fazenda_id } = req.body;
    const usuario_id = req.usuarioLogado.id;
    const imagem = req.file ? req.file.filename : null;

    console.log('📝 Criando animal:', { nome_animal, codigo, genero, tipo, raca, peso, idade, fazenda_id, usuario_id });

    if (!nome_animal || !codigo || !genero || !tipo || !raca || !peso || !idade || !fazenda_id) {
      console.log('❌ Campos faltando');
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const fazenda = await Fazenda.findOne({ where: { id: fazenda_id, usuario_id } });

    if(!fazenda) {
      console.log('❌ Fazenda não encontrada ou sem permissão:', { fazenda_id, usuario_id });
      return res.status(403).json({ error: "Você não tem permissão para adicionar animais nesta fazenda!" });
    }

    // Mapear codigo: se for alfanumérico, salvar em ambos (codigo e codigo_rfid) para exibir corretamente
    let codigo_rfid = null;
    let codigo_salvar = null;
    const codigo_str = String(codigo || '').trim();
    const codigo_num = Number(codigo_str);
    if (!codigo_str || isNaN(codigo_num)) {
      // RFID alfanumérico: mantemos o valor em ambos os campos
      codigo_rfid = codigo_str;
      codigo_salvar = codigo_str;
    } else {
      // Numérico: armazena número em codigo e deixa codigo_rfid nulo
      codigo_salvar = String(codigo_num);
    }

    console.log('✅ Fazenda validada, criando animal...');
    const novoAnimal = await animalService.create({
      nome_animal,
      codigo: codigo_salvar,
      codigo_rfid,
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
    const { nome_animal, codigo, genero, tipo, raca, peso, idade } = req.body;
    const atualizado = await animalService.update(
      id, usuario_id, {
      nome_animal,
      codigo,
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
      return res.status(200).json({ animal });
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
};
