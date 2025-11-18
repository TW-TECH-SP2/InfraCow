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

connection.sync({ alter: true })
  .then(() => console.log('Banco sincronizado com sucesso!'))
  .catch(err => console.error('Erro ao sincronizar banco:', err));

import usuarioRoutes from './routes/usuarioRoutes.js';
import fazendaRoutes from './routes/fazendaRoutes.js';
import animalRoutes from './routes/animalRoutes.js';
import medicaoRoutes from './routes/medicaoRoutes.js'
import pdfRoutes from './routes/pdfRoutes.js';
import healthRoutes from './routes/healthRoutes.js';

import cors from 'cors';
import path from 'path'

const allowedOrigins = [
  "http://localhost:5173",
  "https://infracow.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS bloqueado: origem não permitida -> " + origin));
  }
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/uploads", express.static(path.resolve("uploads")));

app.use("/", usuarioRoutes);
app.use("/", fazendaRoutes);
app.use("/", animalRoutes);
app.use("/", medicaoRoutes);
app.use("/", pdfRoutes);
app.use("/", healthRoutes);

const port = 4000;
app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));