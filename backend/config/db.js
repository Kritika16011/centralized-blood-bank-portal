
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'AaBbCcflyhigh123',
  database: 'deekshadb1',
  // Adjust connectionLimit as needed
  connectionLimit: 10
});

pool.getConnection()
  .then(() => {
    console.log('Connected to MySQL Database (Pool).');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    throw error;
  });

export default pool;
