import animalService from "../services/animalService.js";
import fazendaService from "../services/fazendaService.js";
import Fazenda from "../models/Fazenda.js";
import Medicao from "../models/Medicoes.js";
import Animais from "../models/Animais.js";
import usuarioController from "./usuarioController.js";

const getAllFazendas = async (req, res) => {
  try {
    const usuario_id = req.usuarioLogado.id;
    const fazendas = await fazendaService.getAll(usuario_id);
    return res.status(200).json({ fazendas });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const createFazenda = async (req, res) => {
  try {

    const { nome_fazenda, rua, bairro, cidade, CEP, numero } = req.body;
    const usuario_id = req.usuarioLogado.id;
    const imagem = req.file ? req.file.filename : null;

    if (!nome_fazenda || !rua || !bairro || !cidade || !CEP || !numero) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const novaFazenda = await fazendaService.create({
      nome_fazenda,
      rua,
      bairro,
      cidade,
      CEP,
      numero,
      usuario_id,
      imagem,
    });
    return res.status(201).json({ message: "Fazenda criada com sucesso!", fazenda: novaFazenda, });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const deleteFazenda = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuario_id = req.usuarioLogado.id;
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID Inválido" });
    }
    const apagado = await fazendaService.delete(id, usuario_id);
    if (apagado) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ error: "Fazenda não encontrada" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const updateFazenda = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuario_id = req.usuarioLogado.id;
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID Inválido" });
    }

    const { nome_fazenda, rua, bairro, cidade, CEP, numero } = req.body;
    const atualizado = await fazendaService.update(
      id,
      nome_fazenda,
      rua,
      bairro,
      cidade,
      CEP,
      numero,
      usuario_id,
    );
    if (atualizado) {
      return res.status(200).json({ message: "Fazenda atualizada com sucesso!" });
    } else {
      return res.status(404).json({ error: "Fazenda não encontrada" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const getOneFazenda = async (req, res) => {
  console.log('→ Entrou em getOneFazenda');
  console.log('Params:', req.params);
  console.log('Usuário:', req.usuarioLogado);
  try {
    const id = parseInt(req.params.id);
    const usuario_id = req.usuarioLogado.id;
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID Inválido" });
    }

    const fazenda = await fazendaService.getOne(id, usuario_id);
    if (!fazenda) {
      return res.status(404).json({ error: "Fazenda não encontrada" });
    } else {
      return res.status(200).json({ fazenda });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const getEstatisticasFazenda = async (req, res) => {
  try {
  const fazendaId = parseInt(req.params.id, 10);
  const usuario_id = req.usuarioLogado.id;

  if(isNaN(fazendaId)) {
    return res.status(400).json({ error: "ID de fazenda inválido" });
  }

  const animais = await animalService.getByFazendaId(fazendaId, usuario_id)

  if(!animais || animais.length === 0) {
    return res.status(200).json({  total: 0, machos: 0, femeas: 0, mediaTemp: 0,});
  }

  const total = animais.length;
  const machos = animais.filter(a => a.genero === "M").length;
  const femeas = animais.filter(a => a.genero === "F").length;
  const temps = animais.map(a => a.medicoes?.[0]?.temp).filter(t => typeof t === "number");

const mediaTemp = temps.length > 0
  ? (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1)
  : 0;

return res.status(200).json({ total, machos, femeas, mediaTemp: Number(mediaTemp),});
  } catch (error) {
    console.log("Erro nas estatísticas: ", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};


export default {
  getAllFazendas,
  createFazenda,
  deleteFazenda,
  updateFazenda,
  getOneFazenda,
  getEstatisticasFazenda,
};
