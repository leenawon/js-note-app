const noteList = document.querySelector('.note-list');
const addNoteButton = document.querySelector('.note-input button');
const title = document.querySelector('.note-title');
const content = document.querySelector('.note-content');
const deleteAllButton = document.querySelector('.delete-all-button');

const CHECK_CLASS = "check";

let ID = 1;

function Note(id, title, content) {
  this.id = id;
  this.title = title;
  this.content = content;
}

// get Notes - Local Storage
function noteLocalStorage() {
  const getNotes = localStorage.getItem('Notes');
  return getNotes ? JSON.parse(getNotes) : [];
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
    <button type="button" class="delete-button">
      <span><i class="fas fa-trash-alt"></i></span>
      삭제
    </button>`;
  noteList.appendChild(noteItemDiv);
}

// Delete Note Item
function deleteNote(event) {
  if(event.target.classList.contains('delete-button')) {
    event.target.parentElement.remove();
    // note Item의 item-id 값
    let ItemId = event.target.parentElement.attributes[1].value;
    let notes = noteLocalStorage();
    let updateNote = notes.filter((note) => {
      return note.id !== parseInt(ItemId);
    });
    localStorage.setItem('Notes', JSON.stringify(updateNote));
  }
}

// Delete All Note Item
function deleteAllNote() {
  localStorage.removeItem('Notes');
  let allNoteItem = document.querySelectorAll('.note-item');
  if(allNoteItem.length > 0) {
    allNoteItem.forEach((item) => {
      noteList.removeChild(item);
    })
  }
  ID = 1;
}

// Show Note Item (Local Storage)
function showNote() {
  let notes = noteLocalStorage();
  if(notes.length > 0) {
    ID = notes[notes.length -1].id;
    ID++;
  } else {
    ID = 1;
  }
  notes.forEach((item) => {
    createNoteItem(item);
  });
}

// Handle Add Note
function handleAddNote() {
  if(checkNoteInput(title, content)) {
    let noteArray = noteLocalStorage();
    let noteItem = new Note(ID, title.value, content.value);
    ID++;
    noteArray.push(noteItem);
    createNoteItem(noteItem);
    localStorage.setItem('Notes', JSON.stringify(noteArray));
    title.value = "";
    content.value = "";
  }
}

// Add Button Click Event Listener
addNoteButton.addEventListener('click', handleAddNote);
// Show Note Item Event Listener
document.addEventListener('DOMContentLoaded', showNote);
// Delete Note Button Event Listener
noteList.addEventListener('click', deleteNote);
// Delete All Button Event Listener
deleteAllButton.addEventListener('click', deleteAllNote);