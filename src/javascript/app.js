const noteList = document.querySelector('.note-list');
const addNoteButton = document.querySelector('.note-input button');
const title = document.querySelector('.note-title');
const content = document.querySelector('.note-content');

let ID = 1;

function Note(id, title, content) {
  this.id = id;
  this.title = title;
  this.content = content;
}

function handleAddNote() {
    let noteArray = [];
    let noteItem = new Note(ID, title.value, content.value);
    ID++;
    noteArray.push(noteItem);
    console.log(noteArray);
}

addNoteButton.addEventListener('click', handleAddNote);