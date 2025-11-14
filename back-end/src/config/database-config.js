import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const connection = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  dialectOptions: {
    ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : false
  }
});

export default connection;