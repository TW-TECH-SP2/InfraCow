import express from 'express'

const healthRoutes = express.Router();

healthRoutes.get('/health', (req, res) => {
  res.status(200).send('OK');
});

export default healthRoutes;