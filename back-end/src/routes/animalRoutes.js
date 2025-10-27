import express from 'express'
import animalController from "../controllers/animalController.js";
import Autorizacao from '../middlewares/Auth.js';

const animalRoutes = express.Router();

animalRoutes.get("/animais", Autorizacao, animalController.getAllAnimais);

animalRoutes.get("/animais/fazenda/:id", Autorizacao, animalController.getAnimaisByFazenda);

animalRoutes.get("/animais/:id", Autorizacao, animalController.getOneAnimal);

animalRoutes.post("/animais", Autorizacao, animalController.createAnimal);

animalRoutes.delete("/animais/:id", Autorizacao, animalController.deleteAnimal);

animalRoutes.put("/animais/:id", Autorizacao, animalController.updateAnimal);

export default animalRoutes;