const { notes } = require('./db/db.json')
const express = require('express')

const PORT = process.env.PORT || 3001
const app = express()
app.use(express.static(__dirname + '/'))

app.get('/api/notes', (req, res) => {
    res.send(notes)
})

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname })
})

app.get('/notes', (req, res) => {
    res.sendFile('notes.html', {root: __dirname })
})

app.listen(PORT, () => {
    console.log(`API server now on port 3001`)
})