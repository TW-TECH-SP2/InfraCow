import Sequelize from "sequelize";
import connection from "../config/database-config.js";

const Usuario = connection.define('usuarios', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Usuario;