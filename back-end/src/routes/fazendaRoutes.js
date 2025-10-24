import express from 'express'
import fazendaController from "../controllers/fazendaController.js";
import Auth from '../middlewares/Auth.js'

const fazendaRoutes = express.Router();

fazendaRoutes.get("/fazendas", Auth.Autorizacao, fazendaController.getAllFazendas);

fazendaRoutes.post("/fazendas", Auth.Autorizacao, fazendaController.createFazenda);

fazendaRoutes.delete("/fazendas/:id", Auth.Autorizacao, fazendaController.deleteFazenda);

fazendaRoutes.put("/fazendas/:id", Auth.Autorizacao, fazendaController.updateFazenda);

fazendaRoutes.get("/fazendas/:id", Auth.Autorizacao, fazendaController.getOneFazenda);

export default fazendaRoutes;