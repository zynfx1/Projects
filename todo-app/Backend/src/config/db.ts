import mySql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mySql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  database: process.env.MYSQLDATABASE,
  password: process.env.MYSQLPASSWORD,
  port: Number(process.env.MYSQLPORT) || 3306,
  connectionLimit: 10,
  waitForConnections: true,
});
export default pool;
