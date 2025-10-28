import express from 'express'
import fazendaController from "../controllers/fazendaController.js";
import Autorizacao from '../middlewares/Auth.js';
import upload from '../middlewares/uploadFotos.js';

const fazendaRoutes = express.Router();
const uploadFazenda = upload("fazendas");

fazendaRoutes.get("/fazendas", Autorizacao, fazendaController.getAllFazendas);

fazendaRoutes.post("/fazendas", Autorizacao, uploadFazenda.single("imagem") ,fazendaController.createFazenda);

fazendaRoutes.delete("/fazendas/:id", Autorizacao, fazendaController.deleteFazenda);

fazendaRoutes.put("/fazendas/:id", Autorizacao, uploadFazenda.single("imagem"), fazendaController.updateFazenda);

fazendaRoutes.get("/fazendas/:id", Autorizacao, fazendaController.getOneFazenda);

fazendaRoutes.get("/fazendas/:id/estatisticas", Autorizacao, fazendaController.getEstatisticasFazenda);

export default fazendaRoutes;