const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const note = require("./Models/note.model");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let notes = [];

app.get('/', (req, res) => {
    res.send('Hello World, from express');
})

app.get('/allNotes', (req, res) => {
    res.send(notes);
})

app.post('/newNote', (req, res) => {


    var newNote = new note(req.body)

    console.log(newNote);

    notes.push(newNote);




    res.send(`Your Note ${newNote.title} is Added`)
})

app.delete('/note/:title', (req, res) => {

    const title = req.params.title;

    notes = notes.filter(note => {
        if (note.title !== title) {
            console.log(note);
            return true;
        }
        return false;
    });

    res.send(`${title} Notes is Deleted`)

})

app.patch('/note/:title', (req, res) => {

    const title = req.params.title;
    const newNote = req.body;

    for (let i = 0; i < notes.length; i++) {

        if (notes[i].title === title) {
            notes[i] = newNote;
        }

    }


    res.send(`${title} Note is Updated `)

})



app.listen(port, () => console.log(`Note Taking API Listening on PORT ${port}`));


