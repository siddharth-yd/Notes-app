const fs = require('fs');
const chalk = require('chalk');
const { title } = require('process');

const getnotes = function () {
    return "Your notes....";
}

const addnotes = function (title, body) {
    const notes = loadnotes();
    const duplicatenotes = notes.filter((note) => note.title === title)
    // const duplicatenotes = notes.filter(function (note) {
    //     return note.title === title;
    // })

    // const duplicatenote = notes.find((note) => note.title === title)

    if (duplicatenotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        savenotes(notes);
        console.log('New note added!');
    }
    else {
        console.log('Note title taken!');
    }

    // console.log(notes);

}

const removenotes = (title, body) => {
    const notes = loadnotes();
    const notestokeep = notes.filter((note) => note.title !== title)
    // const notestokeep = notes.filter(function (note) {
    //     return note.title !== title;
    // })
    if (notes.length > notestokeep.length) {
        savenotes(notestokeep);
        console.log(chalk.bgGreen('Note Removed!'));
    }
    else {
        console.log(chalk.bgRed('No note found!'));
    }
}

const listnotes = () => {
    const notes = loadnotes();
    console.log(chalk.inverse.cyan('Your notes'))
    notes.forEach((note) => {
        console.log(note.title);
    })
}

const readnotes = (title) => {
    const notes = loadnotes();
    const note = notes.find((note) => note.title === title);
    
    if(note){
        console.log(chalk.inverse.white(note.title));
        console.log(chalk.inverse.green(note.body));
    }
    else{
        console.log(chalk.bgRed.cyan('No note found?'));
    }
}

const savenotes = function (notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadnotes = () => {
    try {
        const dataBUFFER = fs.readFileSync('notes.json');
        const dataJSON = dataBUFFER.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

module.exports = {
    getnotes: getnotes,
    addnotes: addnotes,
    removenotes: removenotes,
    listnotes: listnotes,
    readnotes: readnotes
}