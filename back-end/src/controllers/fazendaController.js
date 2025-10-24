import fazendaService from "../services/fazendaService.js";

const getAllFazendas = async (req, res) => {
  try {
    const fazendas = await fazendaService.getAll();
    res.status(200).json({ fazendas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const createFazenda = async (req, res) => {
  try {
    const { nome_fazenda, rua, bairro, cidade, CEP, numero } = req.body;
    await fazendaService.Create(nome_fazenda, rua, bairro, cidade, CEP, numero);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const deleteFazenda = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID Inválido" });
    }
    const deleted = await fazendaService.Delete(id);
    if (deleted) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "Fazenda não encontrada" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const updateFazenda = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID Inválido" });
    }

    const { nome_fazenda, rua, bairro, cidade, CEP, numero } = req.body;
    const updated = await fazendaService.Update(
      id,
      nome_fazenda,
      rua,
      bairro,
      cidade,
      CEP,
      numero
    );
    if (updated) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ error: "Fazenda não encontrada" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const getOneFazenda = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID Inválido" });
    }

    const fazenda = await fazendaService.getOne(id);
    if (!fazenda) {
      res.sendStatus(404).json({ error: "Fazenda não encontrada" });
    } else {
      res.status(200).json({ fazenda });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export default {
  getAllFazendas,
  createFazenda,
  deleteFazenda,
  updateFazenda,
  getOneFazenda,
};
