import express from "express";
const bovinoRoutes = express.Router();
import bovinoController from "../controllers/bovinoController.js";
import Auth from '../middleware/Auth.js'

bovinoRoutes.get("/bovinos", Auth.Authorization ,bovinoController.getAllBovinos);

bovinoRoutes.post("/bovinos", Auth.Authorization, bovinoController.createBovino);

bovinoRoutes.delete("/bovinos/:id", Auth.Authorization,bovinoController.deleteBovino);

bovinoRoutes.put("/bovinos/:id", Auth.Authorization, bovinoController.updateBovino);

bovinoRoutes.get("/bovinos/:id", Auth.Authorization, bovinoController.getOneBovino);

export default bovinoRoutes;