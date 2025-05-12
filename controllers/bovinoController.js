import { ObjectId } from "mongodb";
import bovinoService from "../services/bovinoService.js";

const getAllBovinos = async (req, res) => {
  try {
    const bovinos = await bovinoService.getAll();
    res.status(200).json({ bovinos: bovinos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const createBovino = async (req, res) => {
  try {
    const { name, weight, birth, idSensor, id_RFID } = req.body;
    await bovinoService.Create(name, weight, birth, idSensor, id_RFID);
    res.status(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor " });
  }
};

const deleteBovino = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      bovinoService.Delete(id);
      res.sendStatus(204);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const updateBovino = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const { name, weight, birth, idSensor, id_RFID } = req.body;
      const bovino = await bovinoService.Update(
        id,
        name,
        weight,
        birth,
        idSensor,
        id_RFID
      );
      res.status(200).json({ bovino });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500)
  }
};

const getOneBovino = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const bovino = await bovinoService.getOne(id);
      if (!bovino) {
        res.sendStatus(404);
      } else {
        res.status(200).json({ bovino });
      }
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500)
  }
};

export default {
  getAllBovinos,
  createBovino,
  deleteBovino,
  updateBovino,
  getOneBovino,
};