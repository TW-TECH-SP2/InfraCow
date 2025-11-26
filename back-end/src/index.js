import express from 'express'
const app = express();

import connection from './config/database-config.js';
import Usuario from './models/Usuario.js';
import Fazenda from './models/Fazenda.js';
import Animais from './models/Animais.js';
import Alerta from './models/Alertas.js';
import Medicao from './models/Medicoes.js';

Usuario.hasMany(Fazenda, { foreignKey: 'usuario_id' });
Fazenda.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Fazenda.hasMany(Animais, { foreignKey: 'fazenda_id' });
Animais.belongsTo(Fazenda, { foreignKey: 'fazenda_id' });

Animais.hasMany(Medicao, { foreignKey: 'animais_id' });
Medicao.belongsTo(Animais, { foreignKey: 'animais_id' });

Medicao.hasMany(Alerta, { foreignKey: 'medicaoId' });
Alerta.belongsTo(Medicao, { foreignKey: 'medicaoId' });

async function runStartupMigrations() {
  try {
    console.log('🔧 Verificando/ajustando tipo da coluna animais.codigo...');
    await connection.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name='animais'
            AND column_name='codigo'
            AND data_type='integer'
        ) THEN
          ALTER TABLE "animais" ALTER COLUMN "codigo" TYPE VARCHAR(255) USING "codigo"::text;
        END IF;
      END$$;
    `);
    console.log('🔧 Garantindo coluna animais.codigo_rfid...');
    await connection.query(`
      ALTER TABLE "animais" ADD COLUMN IF NOT EXISTS "codigo_rfid" VARCHAR(255);
    `);
    console.log('✅ Verificação de coluna concluída');
  } catch (e) {
    console.error('❌ Falha ao ajustar coluna animais.codigo:', e.message);
  }
}

connection.sync({ force: false })
  .then(async () => {
    console.log('Banco sincronizado com sucesso!');
    await runStartupMigrations();
  })
  .catch(err => console.error('Erro ao sincronizar banco:', err));

import usuarioRoutes from './routes/usuarioRoutes.js';
import fazendaRoutes from './routes/fazendaRoutes.js';
import animalRoutes from './routes/animalRoutes.js';
import medicaoRoutes from './routes/medicaoRoutes.js'
import pdfRoutes from './routes/pdfRoutes.js';
import healthRoutes from './routes/healthRoutes.js';

import iotRoutes from './routes/iotRoutes.js';

import cors from 'cors';
import path from 'path'

const allowedOrigins = [
  "http://localhost:5173",
  "https://infracow.vercel.app",
  "https://infracow-cicd.onrender.com"
];

app.use(cors({
  origin: (origin, cb) => {
    console.log("🔍 Origin recebida:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      console.log("🟢 CORS liberado");
      return cb(null, true);
    }
    console.log("🔴 CORS bloqueado!", origin);
    return cb(new Error("Origem não permitida"));
  },
  credentials: true
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/uploads", express.static(path.resolve("uploads")));

// (Ping/IoT direct routes removed per user request; using iotRoutes only)

app.use("/", usuarioRoutes);
app.use("/", fazendaRoutes);
app.use("/", animalRoutes);
app.use("/", medicaoRoutes);
app.use("/", pdfRoutes);
app.use("/", healthRoutes);

app.use("/", iotRoutes);

// Fallback direto: /iot/ping (garante ping mesmo se router falhar)
app.get('/iot/ping', (req, res) => {
  res.status(200).json({ pong: true, time: new Date().toISOString() });
});

// Porta dinâmica para ambientes como Render (define PORT) ou fallback local
const port = process.env.PORT || 4000;
console.log(`🔌 Porta configurada: ${port} (env.PORT=${process.env.PORT || 'undefined'})`);
app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));