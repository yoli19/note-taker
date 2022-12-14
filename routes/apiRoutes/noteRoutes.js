const router = require('express').Router();
const { getNotes, newNote, filterByQuery, findById, createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/notes.json');
const fs = require('fs');
const path = require('path');


router.get('/notes', (req, res) => {
//   let results = notes;
//   if (req.query) {
//     results = filterByQuery(req.query, results);
//   }
//   res.json(results);
    getNotes().then(data => {
        return res.json(data)
    })
});

router.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post('/notes', (req, res) => {
    console.log(notes)
  // set id based on what the next index of the array will be
//   req.body.id = notes.length.toString();

//   // if any data in req.body is incorrect, send 400 error back
//   if (!validateNote(req.body)) {
//     res.status(400).send('The note is not properly formatted.');
//   } else {
//     const note = createNewNote(req.body, notes);
//     res.json(note);
//   }
    newNote(req.body).then(data => {
        return res.json(data)
    })
});

module.exports = router;
