const notesContainer = document.querySelector(".app");
const addNoteButton = document.querySelector(".add-note");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}
function saveNote(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}
function createNoteElement(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.value = content;
  element.placeholder = "Enter sticky note";
  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });
  element.addEventListener("dblclick", () => {
    const doDelete = confirm("Are you sure you want to delete?");
    if (doDelete) {
      deleteNote(id, element);
    }
  });
  return element;
}
function addNote() {
  const existingNotes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };
  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
  existingNotes.push(noteObject);
  saveNote(existingNotes);
}
function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id === id)[0];
  targetNote.content = newContent;
  saveNote(notes);
}
function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id !== id);
  saveNote(notes);
  notesContainer.removeChild(element);
}
