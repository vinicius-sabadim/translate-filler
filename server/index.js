const fs = require('fs')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.post('/save', (req, res) => {
  const data = req.body

  fs.writeFile('from_server.json', JSON.stringify(data), (err) => {
    if (err) throw err
  })
  res.send('ok')
})

app.listen('3333', () => console.log('Server running on http://localhost:3333'))
