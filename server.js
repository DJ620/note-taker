const fs = require("fs");
const express = require("express");
const path = require("path");
const db = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Tells the server to serve all files in the 'public' file
app.use(express.static("public"));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

let noteID = db.length;
app.post("/api/notes", (req, res) => {
    noteID++;
    const newNote = req.body;
    newNote.id = noteID;
    console.log(newNote);
    db.push(newNote);
    fs.writeFile("db/db.json", JSON.stringify(db), (err) => 
        err ? console.error(err) : console.log("Added new note!")
    );
    res.end(JSON.stringify(db));
});

app.delete("api/notes/:id", (req, res) => {
    console.log(req.params.id);
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});