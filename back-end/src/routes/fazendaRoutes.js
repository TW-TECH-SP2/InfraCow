import express from 'express'
import fazendaController from "../controllers/fazendaController.js";
import Autorizacao from '../middlewares/Auth.js'

const fazendaRoutes = express.Router();

fazendaRoutes.get("/fazendas", Autorizacao, fazendaController.getAllFazendas);

fazendaRoutes.post("/fazendas", Autorizacao, fazendaController.createFazenda);

fazendaRoutes.delete("/fazendas/:id", Autorizacao, fazendaController.deleteFazenda);

fazendaRoutes.put("/fazendas/:id", Autorizacao, fazendaController.updateFazenda);

fazendaRoutes.get("/fazendas/:id", Autorizacao, fazendaController.getOneFazenda);

export default fazendaRoutes;