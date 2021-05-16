var fs = require("fs");
var path = require("path");

module.exports = function (app) {

  app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "db/db.json"));
  });

  app.post("/api/notes", function (req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    //assign unique id to new note
    let noteID = (savedNotes.length).toString();
    newNote.id = noteID;
    //push new note to saved notes 
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));

    res.json(savedNotes);
  });

  app.delete("/api/notes/:id", function (req, res) {
    let deleteNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    //goes through everyone index of the notes db array to find a match of id to delete
    for (var i = 0; i < deleteNote.length; i++) {
      if (deleteNote[i].id == req.params.id) {
        deleteNote.splice(i, 1);
      }
    }
    //rewrites ids so that they can be incremented through again according to length
    for (i = 0; i < deleteNote.length; i++) {
      deleteNote[i].id = i;
    }

    //writes the new array with deleted note to db.json
    fs.writeFileSync('./db/db.json', JSON.stringify(deleteNote), (err) => {
      if (err) throw err;
      return
    });
    res.send(req.body);
  });


}