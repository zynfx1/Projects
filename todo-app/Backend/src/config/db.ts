import mySql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 3306,
  connectionLimit: 10,
  waitForConnections: true,
};
export default pool;
