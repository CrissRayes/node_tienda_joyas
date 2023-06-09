require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { getJoyas } = require('./queries')

const port = process.env.PORT || 3000

app.listen(port, console.log(`Server running on http://localhost:${port}`))


// Middlewares
app.use(cors())
app.use(express.json())

app.get('/joyas', async (req, res) => {
  const queryStrings = req.query
  const joyas = await getJoyas(queryStrings)
  res.status(200).json(joyas)
})