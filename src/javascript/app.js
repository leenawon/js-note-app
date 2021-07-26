const noteList = document.querySelector('.note-list');
const addNoteButton = document.querySelector('.note-input button');
const title = document.querySelector('.note-title');
const content = document.querySelector('.note-content');

const CHECK_CLASS = "check";

let ID = 1;

function Note(id, title, content) {
  this.id = id;
  this.title = title;
  this.content = content;
}

function checkNoteInput(title, content) {
  const titleValue = title.value;
  const contentValue = content.value;
  if((titleValue !== "") && (contentValue !== "")) {
    return true;
  } else {
    if(titleValue == "") {
      title.classList.add(CHECK_CLASS);
    }
    if(contentValue == "") {
      content.classList.add(CHECK_CLASS);
    }
  }
  setTimeout(() => {
    title.classList.remove(CHECK_CLASS);
    content.classList.remove(CHECK_CLASS);
  }, 1000);
}

function handleAddNote() {
  if(checkNoteInput(title, content)) {
    let noteArray = [];
    let noteItem = new Note(ID, title.value, content.value);
    ID++;
    noteArray.push(noteItem);
    console.log(noteArray);
  }
}

addNoteButton.addEventListener('click', handleAddNote);