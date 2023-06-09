require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { getTotalJoyas, getJoyas, getJoyasFiltradas } = require('./queries')

const port = process.env.PORT || 3000

app.listen(port, console.log(`Server running on http://localhost:${port}`))


// Middlewares
app.use(cors())
app.use(express.json())

// contar todas las joyas como una const
const countJoyas = async () => {
  try {
    const count = await getTotalJoyas()
    return count
  } catch (error) {
    console.log('error', error)
  }
}

const formatHATEOAS = async (joyas, page) => {

  const totalJoyas = await countJoyas()

  const results = joyas.map(joya => {
    return {
      name: joya.nombre,
      href: `/joyas/joya/${joya.id}`
    }
  })

  const count = joyas.length * page

  const nextPage = () => {
    if (totalJoyas / count <= 1) {
      return null
    } else {
      return `http://localhost:3000/joyas?page=${parseInt(page) + 1}&limits=3&order_by=id_ASC`
    }
  }

  const prevPage = () => {
    if (page <= 1) {
      return null
    } else {
      return `http://localhost:3000/joyas?page=${parseInt(page) - 1}&limits=3&order_by=id_ASC`
    }
  }

  const HATEOAS = {
    totalCount: totalJoyas,
    thisCount: count,
    next: nextPage(),
    previous: prevPage(),
    results
  }
  return HATEOAS
}

app.get('/joyas', async (req, res) => {
  const queryStrings = req.query
  const { page } = queryStrings
  const joyas = await getJoyas(queryStrings)
  const HATEOAS = await formatHATEOAS(joyas, page)
  res.status(200).json(HATEOAS)
})

app.get('/joyas/filtros', async (req, res) => {
  const queryStrings = req.query
  const joyas = await getJoyasFiltradas(queryStrings)
  res.status(200).json(joyas)
}) 