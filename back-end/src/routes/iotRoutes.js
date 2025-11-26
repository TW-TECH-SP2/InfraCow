import express from 'express';
import { cadastrarTemperatura, listarUltimasMedicoes } from '../controllers/iotController.js';

const router = express.Router();

// POST /iot/temperature
router.post('/iot/temperature', cadastrarTemperatura);

// GET /iot/temperature (para teste)
router.get('/iot/temperature', listarUltimasMedicoes);

export default router;
