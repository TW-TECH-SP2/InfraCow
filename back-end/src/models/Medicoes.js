import Sequelize from 'sequelize'
import connection from '../config/database-config.js'
import Animais from './Animais.js';

const Medicao = connection.define('medicao', {
    temp: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    datahora: {
        type: Sequelize.DATE,
        allowNull: false
    },
    animais_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Animais,
            key: 'id'
        }
    }
})

export default Medicao;