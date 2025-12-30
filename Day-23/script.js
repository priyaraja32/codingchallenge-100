// DOM elements
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const saveBtn = document.getElementById('saveBtn');
const notesList = document.getElementById('notesList');

let notes = JSON.parse(localStorage.getItem('notes')) || [];
let editId = null;

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Render notes
function renderNotes() {
  notesList.innerHTML = '';
  notes.forEach((note, index) => {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.innerHTML = `
      <strong>${note.title}</strong>
      <p>${note.content}</p>
      <button class="edit-btn" onclick="editNote(${index})">Edit</button>
      <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
    `;
    notesList.appendChild(noteDiv);
  });
}

// Add or update note
saveBtn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) {
    alert('Please enter both title and content.');
    return;
  }

  if (editId !== null) {
    notes[editId] = { title, content };
    editId = null;
    saveBtn.textContent = 'Add Note';
  } else {
    notes.push({ title, content });
  }

  titleInput.value = '';
  contentInput.value = '';
  saveNotes();
  renderNotes();
});

// Edit note
function editNote(id) {
  const note = notes[id];
  titleInput.value = note.title;
  contentInput.value = note.content;
  editId = id;
  saveBtn.textContent = 'Update Note';
}

// Delete note
function deleteNote(id) {
  if (confirm('Are you sure you want to delete this note?')) {
    notes.splice(id, 1);
    saveNotes();
    renderNotes();
  }
}

// Initial render
renderNotes();


