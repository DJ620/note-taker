const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let notesArr = [];

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

const getData = fs.readFile(__dirname + "/db/db.json", (err, data) => {
    if (err) throw err;
    notesArr = [];
    notesArr.push(...JSON.parse(data));
    console.log(notesArr);
});

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    console.log(newNote);
    getData;
    notesArr.push(newNote);
    fs.writeFile("db/db.json", JSON.stringify(notesArr), (err) => 
        err ? console.error(err) : console.log("Added new note!")
    );
    res.end(JSON.stringify(notesArr));
});

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});