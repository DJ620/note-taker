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

app.get("/api/notes", (req, res) => {
    fs.readFile(__dirname + "/db/db.json", (err, data) => {
        if (err) throw err;
        res.end(data);
    });
});

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});