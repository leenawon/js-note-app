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

// Check Note Input Value
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

// Create Note Item
function createNoteItem(noteItem) {
  const noteItemDiv = document.createElement('div');
  noteItemDiv.classList.add('note-item');
  noteItemDiv.setAttribute('item-id', noteItem.id);
  noteItemDiv.innerHTML = `
    <h3>${noteItem.title}</h3>
    <p>${noteItem.content}</p>
    <button type="button">
      <span><i class="fas fa-trash-alt"></i></span>
      삭제
    </button>`;
  noteList.appendChild(noteItemDiv);
}

// Handle Add Note
function handleAddNote() {
  if(checkNoteInput(title, content)) {
    let noteArray = [];
    let noteItem = new Note(ID, title.value, content.value);
    ID++;
    noteArray.push(noteItem);
    createNoteItem(noteItem);
    title.value = "";
    content.value = "";
  }
}

// Add Button Click Event Listener
addNoteButton.addEventListener('click', handleAddNote);