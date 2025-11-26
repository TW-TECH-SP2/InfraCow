import express from 'express';
import { cadastrarTemperatura, listarUltimasMedicoes } from '../controllers/iotController.js';

const router = express.Router();

// Middleware: CORS básico + log detalhado de requisições IoT
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  console.log('📡 IoT Req:', req.method, req.originalUrl);
  console.log('📡 IoT Headers:', req.headers);
  next();
});

// GET /iot/ping (teste simples de conectividade para ESP32)
router.get('/iot/ping', (req, res) => {
  res.status(200).json({ pong: true, time: new Date().toISOString() });
});

// POST /iot/temperature
router.post('/iot/temperature', cadastrarTemperatura);

// GET /iot/temperature (para teste)
router.get('/iot/temperature', listarUltimasMedicoes);

export default router;
