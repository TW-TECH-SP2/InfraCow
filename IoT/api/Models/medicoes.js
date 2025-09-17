import  Sequelize  from "sequelize";
import connection from "../config/sequelize-config.js";

const medicoes  = connection.define('medicoes',{
    temperatura:{
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

export default medicoes;