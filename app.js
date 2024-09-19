// const fs = require('fs');

// fs.writeFileSync('notes.txt', 'this is created using node.js');

// fs.appendFileSync('notes.txt', '\textra texts');

// const add = require('./until.js');

// console.log(add(4, 5));

// const getnotes = require('./notes.js');
// console.log(getnotes());

const validator = require('validator');
// console.log(validator.isEmail('asdf@gmail.com'));

const chalk = require('chalk');
// console.log(chalk.bold.blue.inverse('Success!'));

// console.log(process.argv);
const yargs = require('yargs');
const { argv, demandOption, string } = require('yargs');
// console.log(yargs.argv);

const notes = require('./notes.js');

yargs.command({
    command:'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true
        },
        body: {
            describe: 'Body',
            demandOption: true,
            type: 'string'
        }
    },
    // handler: function(argv){
    //     // console.log(chalk.magenta.bgRed('Adding a new note!\n' + 'Title: ' + argv.title + '\nBody: ' + argv.body));
    //     notes.addnotes(argv.title, argv.body);
    // }
    handler(argv){
        // console.log(chalk.magenta.bgRed('Adding a new note!\n' + 'Title: ' + argv.title + '\nBody: ' + argv.body));
        notes.addnotes(argv.title, argv.body);
    }
})

yargs.command({
    command:'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            demandOption: true, 
            type: string
        },
        body: {
            demandOption: true,
            type: string
        }
    },
    handler: function(argv){
        // console.log('Removing a note!');
        notes.removenotes(argv.title, argv.body);
    }
})

yargs.command({
    command:'list',
    describe: 'list a note',
    handler(){
        notes.listnotes();
        // console.log('Listing a note!');
    }
})

yargs.command({
    command:'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: string
        }
    },
    handler(argv){
        // console.log('Reading a note!');
        notes.readnotes(argv.title)
    }
})

// console.log(yargs.argv);
yargs.parse();