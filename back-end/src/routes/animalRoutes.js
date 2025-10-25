import express from 'express'
import animalController from "../controllers/animalController.js";
import Autorizacao from '../middlewares/Auth.js';

const animalRoutes = express.Router();

animalRoutes.get("/animais", Autorizacao, animalController.getAllAnimais);

animalRoutes.post("/animais", Autorizacao, animalController.createAnimal);

animalRoutes.delete("/animais/:id", Autorizacao, animalController.deleteAnimal);

animalRoutes.put("/animais/:id", Autorizacao, animalController.updateAnimal);

animalRoutes.get("/animais/:id", Autorizacao, animalController.getOneAnimal);

export default animalRoutes;