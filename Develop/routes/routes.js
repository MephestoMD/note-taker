const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

module.exports = app => {

    // readFile at beginning of code to allow scoped data to be used for all routes
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
        if (err) throw err
        notesArray = JSON.parse(data);
        
        // GET request to populate current notes
        app.get("/api/notes", (req, res) => {
            res.json(notesArray);
        });

        // POST request to add new notes
        app.post("/api/notes", (req, res) => {
            req.body.id = uniqid();
            notesArray.push(req.body);
            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesArray), (err) => {
                if (err) throw err;
            });
            res.json(notesArray);
            console.log("Note added!");
        });

        app.get("/api/notes/:id", function(req,res) {
            // display json for the notes array indices of the provided id
            res.json(notes[req.params.id]);
        });

        app.delete("/api/notes/:id", function(req, res) {
            
            // Logic to grab the id of the currently selected element
            const idIndex = notesArray.indexOf(notesArray.find(element => element.id === req.params.id));
            
            // .splice() to remove the selected element from the notesArray array
            notesArray.splice(idIndex, 1);
            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesArray), (err) => {
                if (err) throw err;
                res.json(notesArray);
            });
            console.log("Deleted note!")
        });

        // Route to handle the request to open the notes.html page
        app.get("/notes", (req, res) => {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
            });
    
        // Route to handle all other instances of get requests and route them to the index.html page
        app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "../public/index.html"));
          });
           
    });

}