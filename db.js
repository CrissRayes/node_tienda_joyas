require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'project',
  allowExitOnIdle: true,
})

module.exports = pool

/* 
DB TEST CONNECTION
1. Uncomment lines bellow for testing db connection
2. run this command in your terminal: node bd.js
3. Output expected: 
    [ { current_database: 'databaseName' } ]
    Conexion exitosa 
*/

/* 
const testConnection = async () => {
  const sqlQuery = "SELECT NOW()"
  try {
    const result = await pool.query(sqlQuery)
    console.log('Successful connection')
  } catch (error) {
    console.log('Connection failed:', error)
  }
}
testConnection()

const testBase = async () => {
  const sqlQuery = "SELECT current_database()"
  try {
    const result = await pool.query(sqlQuery)
    console.log(result.rows)
  } catch (error) {
    console.log('Connection failed:', error)
  }
}
testBase()
 */