import Sequelize from 'sequelize'
import connection from '../config/database-config.js'
import Fazenda from './Fazenda.js';

const Animais = connection.define('animais', {
    nome_animal: {
        type: Sequelize.STRING,
        allowNull: false
    },
    codigo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    codigo_rfid: {
        type: Sequelize.STRING,
        allowNull: true
    },
    genero: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    raca: {
        type: Sequelize.STRING,
        allowNull: false
    },
    peso: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    idade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fazenda_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Fazenda,
            key: 'id'
        }
    },
    imagem: {
        type: Sequelize.STRING,
        allowNull: true,
    }
})

export default Animais;