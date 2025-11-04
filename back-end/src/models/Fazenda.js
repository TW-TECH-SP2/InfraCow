import Sequelize from 'sequelize'
import connection from "../config/database-config.js";
import Usuario from './Usuario.js';

const Fazenda = connection.define('fazendas', {
    nome_fazenda: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rua: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bairro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    CEP: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    numero: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    imagem: {
        type: Sequelize.STRING,
        allowNull: true,
    }

})

export default Fazenda;