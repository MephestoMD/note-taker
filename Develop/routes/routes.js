const fs = require('fs');
const path = require('path');

module.exports = app => {

    let notesArray;
    // Route to get current notes found in 'db.json'
    app.get("/api/notes", (req, res) => {
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
            if (err) throw err
            notesArray = JSON.parse(data);
            res.json(notesArray);
        });
    });

    // Route to add new notes to the 'db.json' file

    app.post("/api/notes", (req, res) => {
        notesArray.push(JSON.stringify(req.body));
        console.log(notesArray);
        fs.writeFile(path.join(__dirname, "../db/db.json"), notesArray, (err) => {
            if (err) throw err;
            console.log("Note added!");
        });
    });



    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
      });


}