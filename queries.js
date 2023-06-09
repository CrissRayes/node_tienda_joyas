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
  let filters = []
  const values = []

  const addFilter = (field, comparator, value) => {
    values.push(value)
    const { length } = filters
    filters.push(`${field} ${comparator} $${length + 1}`)
  }

  if (precio_max) addFilter('precio', '<=', precio_max)
  if (precio_min) addFilter('precio', '>=', precio_min)
  if (categoria) addFilter('categoria', '=', categoria)
  if (metal) addFilter('metal', '=', metal)

  let sqlQuery = "SELECT * FROM inventario"

  if (filters.length > 0) {
    filters = filters.join(" AND ")
    sqlQuery += ` WHERE ${filters}`
  }

  const { rows: joyas } = await pool.query(sqlQuery, values)
  return joyas

}

module.exports = {
  getTotalJoyas,
  getJoyas,
  getJoyasFiltradas
}
