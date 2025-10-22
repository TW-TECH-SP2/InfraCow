import Sequelize from 'sequelize'
import connection from '../config/sequelize-config.js'
import Fazenda from './Fazenda.js';

const Animais = connection.define('animais', {
    nome_animal: {
        type: Sequelize.STRING,
        allowNull: false
    },
    codigo: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    }
})

Animais.belongsTo(Fazenda, { foreignKey: 'fazenda_id' });

Animais.sync({ force: false});

export default Animais;