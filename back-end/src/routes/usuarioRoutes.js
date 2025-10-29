import express from 'express'
import usuarioController from "../controllers/usuarioController.js";
import Autorizacao from '../middlewares/Auth.js'

const usuarioRoutes = express.Router();

usuarioRoutes.post("/usuario", usuarioController.criarUsuario);

usuarioRoutes.post("/login", usuarioController.loginUsuario);

usuarioRoutes.get("/usuarios/me", Autorizacao, usuarioController.getUsuarioLogado);

usuarioRoutes.put("/usuarios/:id", Autorizacao, usuarioController.updateUsuario);

export default usuarioRoutes;