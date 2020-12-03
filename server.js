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

const writeDb = () => {
    fs.writeFile("db/db.json", JSON.stringify(db), (err) => {
        if (err) return console.log(err);
        console.log("Database updated!");
    });
};

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
    writeDb();
    res.end(JSON.stringify(db));
});

app.delete("/api/notes/:id", (req, res) => {
    for (let i = 0; i < db.length; i++) {
        if (db[i].id == req.params.id) {
            db.splice(i, 1);
        };
    };
    writeDb();
    console.log(db)
    res.json(db);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});