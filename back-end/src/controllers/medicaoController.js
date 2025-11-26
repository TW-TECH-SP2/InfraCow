import medicaoService from "../services/medicaoService.js";

const getAllMedicoes = async (req, res) => {
  try {
    const medicoes = await medicaoService.getAll();
    return res.status(200).json({ medicoes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const createMedicao = async (req, res) => {
  try {
    const { temperatura, data_medicao, animais_id } = req.body;

    if (!temperatura || !data_medicao || !animais_id) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const novaMedicao = await medicaoService.create({ temperatura, data_medicao, animais_id });
    return res.status(201).json({ message: "Medição criada com sucesso!", medicao: novaMedicao });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const deleteMedicao = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const apagado = await medicaoService.delete(id);
    if (apagado === 0 || apagado === undefined) {
      return res.status(404).json({ error: "Medição não encontrada" });
    } else {
      return res.status(204).send();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const updateMedicao = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const { temperatura, data_medicao, animais_id } = req.body;
    const atualizado = await medicaoService.update(id, { temperatura, data_medicao, animais_id });

    if (atualizado === 0 || atualizado === undefined) {
      return res.status(404).json({ error: "Medição não encontrada" });
    } else {
      return res.status(200).json({ message: "Medição atualizada com sucesso!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const getOneMedicao = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const medicao = await medicaoService.getOne(id);
    if (!medicao) {
      return res.status(404).json({ error: "Medição não encontrada" });
    } else {
      return res.status(200).json({ medicao });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export default {
  getAllMedicoes,
  createMedicao,
  deleteMedicao,
  updateMedicao,
  getOneMedicao,
};
