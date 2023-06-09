const pool = require('./db');
const format = require('pg-format')

const getTotalJoyas = async () => {
  const sqlQuery = "SELECT * FROM inventario"
  const { rows } = await pool.query(sqlQuery)
  const count = rows.length
  return count
}

const getJoyas = async (queryStrings) => {
  const { limits = 3, page = 1, order_by = "id_ASC" } = queryStrings
  const [campo, direccion] = order_by.split('_')
  const offset = (page - 1) * limits
  const sqlQuery = format(`
    SELECT * FROM inventario
    ORDER BY %s %s
    LIMIT %s
    OFFSET %s
  `, campo, direccion, limits, offset)

  const { rows: joyas } = await pool.query(sqlQuery)
  return joyas
}

/*
  * @example http://localhost:3000/joyas/filtros?precio_max=1000&precio_min=100&categoria=anillos&metal=oro
*/
const getJoyasFiltradas = async (queryStrings) => {
  const { precio_max, precio_min, categoria, metal } = queryStrings

}

module.exports = {
  getTotalJoyas,
  getJoyas,
  getJoyasFiltradas
}
