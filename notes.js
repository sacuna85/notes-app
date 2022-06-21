const fs = require('fs')
const chalk = require('chalk')

const addNote =  function (title, body) {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    debugger
    
    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Note has been added.'))
    } else {
        console.log(chalk.red.inverse('Note title taken.'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
     const noteIndex = notes.findIndex((note) => note.title === title)
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
        console.log(chalk.green.inverse('Note Removed!'))
    } else {
        console.log(chalk.red.inverse('Note does not exist.'))
    }
    saveNotes(notes)
}

const listNotes =  () => {
    const notes = loadNotes()
    console.log(chalk.blue.bold('Your notes:'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNotes = (title) => {
    const notes = loadNotes()
    const noteFound = notes.find((note) => note.title === title)
    if(!noteFound){
        console.log(chalk.red.bold.inverse('No note found?'))
    } else {
        console.log(chalk.blue.bold(noteFound.title) + ' ' + noteFound.body)
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON) 
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}