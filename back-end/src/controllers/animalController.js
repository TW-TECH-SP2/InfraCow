import animalService from "../services/animalService.js";

const getAllAnimais = async (req, res) => {
  try {
    const animais = await animalService.getAllAnimais();
    res.status(200).json({ animais });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const createAnimal = async (req, res) => {
  try {
    const { nome_animal, codigo, genero, tipo, raca, peso, idade } = req.body;
    await animalService.Create(
      nome_animal,
      codigo,
      genero,
      tipo,
      raca,
      peso,
      idade
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const deleteAnimal = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const deleted = await animalService.Delete(id);
    if (deleted) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "Animal não encontrado" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const updateAnimal = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "ID Inválido" });
    }
    const { nome_animal, codigo, genero, tipo, raca, peso, idade } = req.body;
    const updated = await animalService.Update(
      nome_animal,
      codigo,
      genero,
      tipo,
      raca,
      peso,
      idade
    );
    if (updated) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ error: "Animal não encontrado" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const getOneAnimal = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID Inválido" });
    }

    const animal = await animalService.getOne(id);
    if (!animal) {
      res.sendStatus(404).json({ error: "Animal não encontrado" });
    } else {
      res.status(200).json({ animal });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export default {
  getAllAnimais,
  createAnimal,
  deleteAnimal,
  updateAnimal,
  getOneAnimal,
};
