const pool = require('./db');
const format = require('pg-format')

const getJoyas = async (queryStrings) => {
  const { limits = 3, page = 0, order_by = "precio_ASC" } = queryStrings
  const [campo, direccion] = order_by.split('_')
  const offset = page * limits
  const sqlQuery = format(`
    SELECT * FROM inventario
    ORDER BY %s %s
    LIMIT %s
    OFFSET %s
  `, campo, direccion, limits, offset)

  const { rows: joyas } = await pool.query(sqlQuery)
  return joyas
}

module.exports = {
  getJoyas
}
