import mySql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mySql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 3306,
  connectionLimit: 10,
  waitForConnections: true,
});
export default pool;
