import express from 'express';
import { cadastrarTemperatura } from '../controllers/iotController.js';

const router = express.Router();

// POST /iot/temperature
router.post('/iot/temperature', cadastrarTemperatura);

export default router;
