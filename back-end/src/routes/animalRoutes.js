import express from 'express'
import animalController from "../controllers/animalController.js";
import Auth from '../middlewares/Auth.js';

const animalRoutes = express.Router();

animalRoutes.get("/animais", Auth.Autorizacao, animalController.getAllAnimais);

animalRoutes.post("/animais", Auth.Autorizacao, animalController.createAnimal);

animalRoutes.delete("/animais/:id", Auth.Autorizacao, animalController.deleteAnimal);

animalRoutes.put("/animais/:id", Auth.Autorizacao, animalController.updateAnimal);

animalRoutes.get("/animais/:id", Auth.Autorizacao, animalController.getOneAnimal);

export default animalRoutes;