// Dependencies ====================================================================================================
const fs = require("fs");
const express = require("express");
const path = require("path");
const db = require("./db/db.json");

// Setting up express and my server port
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware ======================================================================================================

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Tells the server to serve all files in the 'public' file
app.use(express.static("public"));

// Functions========================================================================================================

// Function used to update the db.json file
const writeDb = () => {
    fs.writeFile("db/db.json", JSON.stringify(db), (err) => {
        if (err) return console.log(err);
        console.log("Database updated!");
    });
};

// Function used to create a unique 6-digit id for each note
const createID = () => {
    let id = [];
    const letters = "abcdefghijklmnopqrstuvwxyz".split("");
    const numbers = "0123456789".split("");
    while (id.length < 6) {
        id.push(letters[Math.floor(Math.random() * letters.length)]);
        id.push(numbers[Math.floor(Math.random() * numbers.length)]);
    };
    id = id.join("");
    db.forEach(note => {
        if (note.id === id) {
            createID();
        };
    });
    return id;
};

// Routes===========================================================================================================

app.get("/", (req, res) => {
    res.sendFile(path,join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.post("/api/notes", (req, res) => {
    let noteID = createID();
    const newNote = req.body;
    newNote.id = noteID;
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
    res.json(db);
});

// Takes a user to the homepage if they attempt to go anywhere besides the defined routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Starts the server================================================================================================
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});