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
    const { nome_animal, codigo, codigo_rfid, genero, tipo, raca, peso, idade, fazenda_id } = req.body;
    const usuario_id = req.usuarioLogado.id;
    const imagem = req.file ? req.file.filename : null;

    console.log('📝 Criando animal:', { nome_animal, codigo, genero, tipo, raca, peso, idade, fazenda_id, usuario_id });

    // Agora exige pelo menos um entre codigo ou codigo_rfid
    if (!nome_animal || (!codigo && !codigo_rfid) || !genero || !tipo || !raca || !peso || !idade || !fazenda_id) {
      console.log('❌ Campos faltando');
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const fazenda = await Fazenda.findOne({ where: { id: fazenda_id, usuario_id } });

    if(!fazenda) {
      console.log('❌ Fazenda não encontrada ou sem permissão:', { fazenda_id, usuario_id });
      return res.status(403).json({ error: "Você não tem permissão para adicionar animais nesta fazenda!" });
    }

    // Mapeamento flexível: se veio codigo_rfid no body usa ele; senão tenta codigo
    let finalCodigo = null;
    let finalCodigoRfid = null;
    if (codigo_rfid && String(codigo_rfid).trim().length) {
      finalCodigo = String(codigo_rfid).trim();
      finalCodigoRfid = String(codigo_rfid).trim();
    } else if (codigo && String(codigo).trim().length) {
      const raw = String(codigo).trim();
      const maybeNum = Number(raw);
      if (!isNaN(maybeNum) && /^\d+$/.test(raw)) {
        // totalmente numérico
        finalCodigo = String(maybeNum);
        finalCodigoRfid = null; // não é RFID
      } else {
        // alfanumérico tratado como RFID
        finalCodigo = raw;
        finalCodigoRfid = raw;
      }
    }
    if (!finalCodigo) {
      console.log('❌ Mapeamento de código falhou');
      return res.status(400).json({ error: 'Código/RFID inválido' });
    }

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
