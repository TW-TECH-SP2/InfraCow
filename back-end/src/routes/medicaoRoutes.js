import express from 'express';
import medicaoController, { getMedicoesByAnimal } from "../controllers/medicaoController.js";
import Autorizacao from '../middlewares/Auth.js';

const medicaoRoutes = express.Router();

medicaoRoutes.get("/medicoes", Autorizacao, medicaoController.getAllMedicoes);

medicaoRoutes.post("/medicoes", Autorizacao, medicaoController.createMedicao);

medicaoRoutes.get("/medicoes/:id", Autorizacao, medicaoController.getOneMedicao);

// Novo: lista medições por animal
medicaoRoutes.get("/medicoes/animal/:id", Autorizacao, getMedicoesByAnimal);

medicaoRoutes.put("/medicoes/:id", Autorizacao, medicaoController.updateMedicao);

medicaoRoutes.delete("/medicoes/:id", Autorizacao, medicaoController.deleteMedicao);

export default medicaoRoutes;