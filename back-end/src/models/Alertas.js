import Sequelize from 'sequelize'
import connection from '../config/database-config.js'
import Medicao from './Medicoes.js';

const Alerta = connection.define('alertas', {
    risk: {
        type: Sequelize.STRING,
        allowNull: false
    },
    notes: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Alerta;