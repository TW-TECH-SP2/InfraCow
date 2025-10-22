import Sequelize from 'sequelize'
import connection from '../config/sequelize-config.js'
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

Alerta.belongsTo(Medicao, { ForeignKey: 'medicao_id' });

Alerta.sync({force: false });

export default Alerta;