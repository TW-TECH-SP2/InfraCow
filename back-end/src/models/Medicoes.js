import Sequelize from 'sequelize'
import connection from '../config/sequelize-config.js'
import Animais from './Animais.js';

const Medicao = connection.define('medicao', {
    temp: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    datahora: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

Medicao.belongsTo(Animais, { foreignKey: 'animais_id' });

Medicao.sync({force: false})

export default Medicao;