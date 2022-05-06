'use strict'

const yargs = require('yargs')
const notes = require('./notes.js')

// Customize yargs version
yargs.version('1.1.0')

// Customize add command
yargs.command({
    command: 'add',
    describe: 'Way to add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,                                     
            type: 'string'                                          
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler({ title, body }) {
        notes.addNotes(title, body)
    }
})

// Customize remove command
yargs.command({
    command: 'remove',
    describe: 'Way to remove the note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler({ title }) {
        notes.removeNotes(title)
    }
})

// Customize list command
yargs.command({
    command: 'list',
    describe: 'Way to list all of your notes',
    handler() {
        notes.listNotes()
    }
})

// Customize read command
yargs.command({
    command: 'read',
    describe: 'Way to read the note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler({ title }) {
        notes.readNotes(title)
    }
})

yargs.parse()