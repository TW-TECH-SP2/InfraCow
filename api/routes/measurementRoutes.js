import express from "express";
const measurementRoutes = express.Router();
import measurementController from "../controllers/measurementController.js";
import Auth from '../middleware/Auth.js'

measurementRoutes.get("/measurements", Auth.Authorization, measurementController.getAllMeasurement);

measurementRoutes.post("/measurements", Auth.Authorization, measurementController.createMeasurement);

measurementRoutes.delete("/measurements/:id", Auth.Authorization, measurementController.deleteMeasurement);

measurementRoutes.put("/measurements/:id", Auth.Authorization, measurementController.updateMeasurement);

measurementRoutes.get("/measurements/:id", Auth.Authorization, measurementController.getOneMeasurement);

export default measurementRoutes;