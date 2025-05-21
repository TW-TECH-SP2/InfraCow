import { ObjectId } from "mongodb";
import alertService from "../services/alertService.js";

const getAllAlertas = async (req, res) => {
  try {
    const alertas = await alertService.getAll();
    res.status(200).json({ alertas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const getOneAlerta = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const alerta = await alertService.getOne(id);
      if (!alerta) {
        res.sendStatus(404);
      } else {
        res.status(200).json({ alerta });
      }
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteAlerta = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const deleted = await alertService.Delete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Alerta não encontrado" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export default {
  getAllAlertas,
  getOneAlerta,
  deleteAlerta,
};
