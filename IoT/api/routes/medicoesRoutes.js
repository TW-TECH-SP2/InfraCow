import express from "express";
import medicoesController from "../controllers/medicoesController.js";

const medidasRouter = express.Router();

medidasRouter.get("/medidas", medicoesController.LerDados);
medidasRouter.post("/medidas", medicoesController.Postar);

export default medidasRouter;
