const { json } = require('express');
const fs = require('fs');
const path = require('path');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);

const writeFileAsync = util.promisify(fs.writeFile);

function getNotes() {
    return readFileAsync(path.join(__dirname, '../db/notes.json'), 'utf8')
        .then(data => {
            return JSON.parse(data)
        })
}

function newNote(note) {
    getNotes().then(data => {
        console.log(data);
        const updatedNotes = [...data, { title: note.title, text: note.text, id: data.length + 1 }]
        writeFileAsync(path.join(__dirname, '../db/notes.json'), JSON.stringify(updatedNotes)).then(() => {
            return note
        })

    })
}


function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if (query.test) {
        filteredResults = filteredResults.filter(note => note.text === query.text);
    }
    return filteredResults;
}

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function createNewNote(body, notesArray) {
    // const note = body;
    // notesArray.push(note);
    // fs.writeFileSync(
    //     path.join(__dirname, '../db/notes.json'),
    //     JSON.stringify({ notes: notesArray }, null, 2)
    // );
    // return note;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

module.exports = {
    getNotes,
    newNote,
    filterByQuery,
    findById,
    createNewNote,
    validateNote
};