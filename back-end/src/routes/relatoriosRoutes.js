import express from "express";
import path from "path";
import fs from "fs";
import uploadRelatorios from "../middlewares/uploadRelatorios.js";

const relatorioRoutes = express.Router();

relatorioRoutes.post("/relatorios/upload", uploadRelatorios().single("relatorio"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Arquivo não enviado" });
    res.status(200).json({ message: "Relatório enviado com sucesso", filename: req.file.filename });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

relatorioRoutes.get("/relatorios/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.resolve("uploads/relatorios", filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Arquivo não encontrado" });
  }

  res.download(filePath, filename);
});

export default relatorioRoutes;