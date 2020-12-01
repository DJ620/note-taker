const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

const getData = fs.readFile(__dirname + "/db/db.json", (err, data) => {
    if (err) throw err;
    return data;
});

app.get("/api/notes", (req, res) => {
    fs.readFile(__dirname + "/db/db.json", (err, data) => {
        if (err) throw err;
        res.end(data);
    });
});

app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    fs.appendFile(__dirname + "/db/db.json", JSON.stringify(newNote), (err) => {
        if (err) throw err;
        console.log("Note added!");
        res.end(newNote);
    })
})

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});