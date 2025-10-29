import express from "express";
import { gerarRelatorioPDF } from "../controllers/pdfController.js";

const pdfRoutes = express.Router();

pdfRoutes.post("/pdf/gerar", gerarRelatorioPDF);

export default pdfRoutes;
