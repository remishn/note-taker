const { notes } = require('./db/db.json')
const express = require('express')

const PORT = process.env.PORT || 3001
const app = express()

app.get('/api/notes', (req, res) => {
    res.send(notes)
})
app.listen(PORT, () => {
    console.log(`API server now on port 3001`)
})