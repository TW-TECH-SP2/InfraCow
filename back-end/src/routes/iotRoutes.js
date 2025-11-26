import express from 'express';
import { cadastrarTemperatura, listarUltimasMedicoes } from '../controllers/iotController.js';

const router = express.Router();

// Middleware: aceita HTTP (desativa redirect HTTPS forçado pelo Render)
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// POST /iot/temperature
router.post('/iot/temperature', cadastrarTemperatura);

// GET /iot/temperature (para teste)
router.get('/iot/temperature', listarUltimasMedicoes);

export default router;
