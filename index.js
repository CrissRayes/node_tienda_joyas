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

const countJoyas = async () => {
  try {
    const count = await getTotalJoyas()
    return count
  } catch (error) {
    console.log('error', error)
  }
}

const formatHATEOAS = async (joyas, page, limits, order_by) => {
  let HATEOAS = {}
  const totalJoyas = await countJoyas()

  const results = joyas.map(joya => {
    return {
      name: joya.nombre,
      href: `/joyas/joya/${joya.id}`
    }
  })

  if (!page) {
    page = 1
  }
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

  HATEOAS = {
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
  const { page, limits, order_by } = queryStrings
  const joyas = await getJoyas(queryStrings)
  const HATEOAS = await formatHATEOAS(joyas, page, limits, order_by)
  res.status(200).json(HATEOAS)
})

app.get('/joyas/filtros', async (req, res) => {
  const queryStrings = req.query
  const joyas = await getJoyasFiltradas(queryStrings)
  res.status(200).json(joyas)
})

app.get("*"), (req, res) => {
  res.status(404).send("Route not found")
}
