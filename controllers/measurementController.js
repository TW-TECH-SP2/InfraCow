import { ObjectId } from "mongodb";
import measurementService from "../services/measurementService.js";

const getAllMeasurement = async (req, res) => {
  try {
    const measurement = await measurementService.getAll();
    res.status(200).json({ measurement: measurement });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const createMeasurement = async (req, res) => {
  try {
    const { captureDate, timeStamp, localCapture, temp } =
      req.body;
    await measurementService.Create(
      captureDate,
      timeStamp,
      localCapture,
      temp
    );
    res.status(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor " });
  }
};

const deleteMeasurement = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      measurementService.Delete(id);
      res.sendStatus(204);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const updateMeasurement = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const {
        captureDate,
        timeStamp,
        localCapture,
        temp,
      } = req.body;
      const measurement = await measurementService.Update(
        id,
        captureDate,
        timeStamp,
        localCapture,
        temp
      );
      res.status(200).json({ measurement });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getOneMeasurement = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const measurement = await measurementService.getOne(id);
      if (!measurement) {
        res.sendStatus(404);
      } else {
        res.status(200).json({ measurement });
      }
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ error: "Erro interno do servidor" });
  }
};

export default {
  getAllMeasurement,
  createMeasurement,
  deleteMeasurement,
  updateMeasurement,
  getOneMeasurement,
};