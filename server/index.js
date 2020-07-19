const fs = require('fs')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.post('/save', (req, res) => {
  const data = req.body

  const languages = Object.keys(data[Object.keys(data)[0]])

  languages.forEach((language) => {
    const content = Object.keys(data).reduce(
      (obj, word) => ({ ...obj, [word]: data[word][language] }),
      {}
    )

    const file = `translations/${language}.json`

    fs.writeFile(file, JSON.stringify(content), (err) => {
      if (err) throw err
    })
  })
  res.send('ok')
})

app.listen('3333', () => console.log('Server running on http://localhost:3333'))
