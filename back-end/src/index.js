import express from 'express'
import connection from './config/sequelize-config.js';
import Usuario from './models/Usuario.js';
import Fazenda from './models/Fazenda.js';
import Animais from './models/Animais.js';
import Alerta from './models/Alertas.js';

import usuarioRoutes from './routes/usuarioRoutes.js';
import fazendaRoutes from './routes/fazendaRoutes.js';

const app = express();

connection.authenticate().then(() => {
    console.log("Conexão com o banco de dados feita com sucesso!")
}).catch((error) => {
    console.log(error)
})

connection.query(`CREATE DATABASE IF NOT EXISTS infracow;`).then(() => {
    console.log("O banco de dados foi criado!")
}).catch((error) => {
    console.log(error)
})

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", usuarioRoutes);
app.use("/", fazendaRoutes);

const port = 4000;
app.listen(port, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log(`API rodando em http://localhost:${port}`);
    }
});