import express from 'express'
import usuarioController from "../controllers/usuarioController.js";

const usuarioRoutes = express.Router();

usuarioRoutes.post("/usuario", usuarioController.criarUsuario);

usuarioRoutes.post("/login", usuarioController.loginUsuario);

export default usuarioRoutes;