const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const notes = require('./db/db.json')
const express = require('express')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.static(__dirname + '/'))

// parse incoming string or array data 
app.use(express.urlencoded({ extended: true}))
// parse incoming JSON data
app.use(express.json())

app.get('/api/notes', (req, res) => {
    res.send(notes)
})

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname })
})

app.get('/notes', (req, res) => {
    res.sendFile('notes.html', {root: __dirname })
})

app.post('/api/notes', (req, res) => {

    // collect note from req body
    let newNote = req.body

    let jsonFilePath = path.join(__dirname, '/db/db.json')

    console.log(newNote)

    // assign unique id from npm package
    newNote.id = uuidv4()

    // push new notes to db.json
    notes.push(newNote)

    // write notes to db.json
    fs.writeFile(jsonFilePath, JSON.stringify(notes), function (err)  {
        if (err) {
            return console.log(err)
        } console.log('notes saved')
    })
    
    // send new notes
    res.json(newNote)
})


app.listen(PORT, () => {
    console.log(`API server now on port 3001`)
})