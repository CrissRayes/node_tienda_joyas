const checkParams = (req, res, next) => {
  const { limits, page, order_by } = req.query
  if (limits && isNaN(limits)) {
    return res.status(400).send('limits must be a number')
  }
  if (page && isNaN(page)) {
    return res.status(400).send('page must be a number')
  }
  if (order_by) {
    const [campo, direccion] = order_by.split('_')
    if (campo !== 'id' && campo !== 'nombre' && campo !== 'categoria' && campo !== 'metal' && campo !== 'precio' && campo !== 'stock') {
      return res.status(400).send('order_by must be id, nombre, categoria, metal, precio or stock')
    }
    if (direccion !== 'ASC' && direccion !== 'DESC') {
      return res.status(400).send('order_by must be ASC or DESC')
    }
  }
  next()
}

const checkFilters = (req, res, next) => {
  const { precio_max, precio_min, categoria, metal } = req.query
  if (precio_max && isNaN(precio_max)) {
    return res.status(400).send('precio_max must be a number')
  }
  if (precio_min && isNaN(precio_min)) {
    return res.status(400).send('precio_min must be a number')
  }
  if (categoria && categoria !== 'collar' && categoria !== 'aros' && categoria !== 'anillo') {
    return res.status(400).send('categoria must be collar, aros or anillo')
  }
  if (metal && metal !== 'oro' && metal !== 'plata') {
    return res.status(400).send('metal must be oro or plata')
  }
  next()
}

module.exports = {
  checkParams,
  checkFilters
}