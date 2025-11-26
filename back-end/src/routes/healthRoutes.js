import express from 'express'
import connection from '../config/database-config.js'

const healthRoutes = express.Router();

healthRoutes.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

healthRoutes.get('/health/db', async (req, res) => {
  try {
    const [cols] = await connection.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name='animais' AND table_schema='public'
    `);
    const map = Object.fromEntries(cols.map(c => [c.column_name, c.data_type]));
    res.status(200).json({
      table: 'animais',
      columns: map,
      codigo_type: map.codigo || null,
      has_codigo_rfid: Object.prototype.hasOwnProperty.call(map, 'codigo_rfid')
    });
  } catch (e) {
    res.status(500).json({ error: 'db_inspect_failed', message: e.message });
  }
});

export default healthRoutes;