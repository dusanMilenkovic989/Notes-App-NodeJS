'use strict'

const fs = require('fs')
const chalk = require('chalk')

let notes = []

const getNote = (title) => notes.find((note) => note.title.toLowerCase() === title.toLowerCase())

const addNotes = (title, body) => {
    const titleTrimmed = title.trim()
    const note = getNote(titleTrimmed)

    if (!note && titleTrimmed.length > 0) {
        notes.push({
            title: titleTrimmed,
            body: body.trim()
        })
        saveNotes()
        console.log(chalk.green.inverse('Note added'))
    } else {
        console.log(chalk.red.inverse('Please provide a note with a different title. This one already exists, or you have not named your title'))
    }
}

const removeNotes = (title) => {
    const note = getNote(title.trim())

    if (note) {
        const noteIndex = notes.findIndex((item) => item.title === note.title)
        notes.splice(noteIndex, 1)
        saveNotes()
        console.log(chalk.green.inverse(`Note: '${note.title}' has been removed from the system`))
    } else {
        console.log(chalk.red.inverse('Note under this title does not exist'))
    }
}

const listNotes = () => {
    if (notes.length > 0) {
        const plural = notes.length !== 1 ? 's' : ''

        console.log(chalk.green.inverse(`Your note${plural}:`))

        notes.forEach((note) => {
            console.log(chalk.green.bold(note.title))
        })
    } else {
        console.log(chalk.red.inverse('There are no notes yet'))
    }
}

const readNotes = (title) => {
    const note = getNote(title.trim())

    if (note) {
        console.log(chalk.green.bold(note.title))
        console.log(chalk.bold(note.body))
    } else {
        console.log(chalk.red.inverse('There is no note with provided title'))
    }
}

const saveNotes = () => {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}

const loadNotes = () => {
    try {
        const notesBuffer = fs.readFileSync('notes.json')
        const notesJSON = notesBuffer.toString()
        return JSON.parse(notesJSON)
    } catch (e) {
        return []
    }
}

notes = loadNotes()

module.exports = {
    addNotes,
    removeNotes,
    listNotes,
    readNotes,
}