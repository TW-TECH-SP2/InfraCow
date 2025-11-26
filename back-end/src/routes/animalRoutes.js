import express from 'express'
import animalController from "../controllers/animalController.js";
import Autorizacao from '../middlewares/Auth.js';
import upload from '../middlewares/uploadFotos.js';

const animalRoutes = express.Router();
const uploadAnimal = upload("animais");

animalRoutes.get("/animais", Autorizacao, animalController.getAllAnimais);

// Endpoint rápido só para listar id + RFID (debug urgente)
animalRoutes.get("/animais/rfid", Autorizacao, async (req, res) => {
	try {
		const usuario_id = req.usuarioLogado.id;
		const animais = await animalController._rawListRFID(usuario_id);
		return res.status(200).json({ rfids: animais });
	} catch (e) {
		return res.status(500).json({ error: 'rfid_list_failed', message: e.message });
	}
});

animalRoutes.get("/animais/fazenda/:id", Autorizacao, animalController.getAnimaisByFazenda);

animalRoutes.get("/animais/:id", Autorizacao, animalController.getOneAnimal);

animalRoutes.post("/animais", Autorizacao, uploadAnimal.single("imagem"), animalController.createAnimal);

animalRoutes.delete("/animais/:id", Autorizacao, animalController.deleteAnimal);

animalRoutes.put("/animais/:id", Autorizacao, uploadAnimal.single("imagem"),animalController.updateAnimal);

export default animalRoutes;