import Sequelize from 'sequelize'
import connection from "../config/sequelize-config.js";
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

})

Fazenda.belongsTo(Usuario, { foreignKey: 'usuario_id'});

Fazenda.sync({force: false})

export default Fazenda;