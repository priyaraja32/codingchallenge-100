const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const saveBtn = document.getElementById("saveBtn");
const notesList = document.getElementById("notesList");
const searchInput = document.getElementById("search");

let notes = JSON.parse(localStorage.getItem("focuspad-notes")) || [
  {
    title: "Daily Focus",
    content: "Finish the UI design, review pull requests, and ship before evening."
  },
  {
    title: "Startup Idea",
    content: "A productivity app that combines notes, tasks, and AI summaries."
  }
];

function renderNotes(filter = "") {
  notesList.innerHTML = "";

  notes
    .filter(n =>
      n.title.toLowerCase().includes(filter) ||
      n.content.toLowerCase().includes(filter)
    )
    .forEach((note, index) => {
      const div = document.createElement("div");
      div.className = "note";

      div.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <div class="actions">
          <button class="edit" onclick="editNote(${index})">Edit</button>
          <button class="delete" onclick="deleteNote(${index})">Delete</button>
        </div>
      `;

      notesList.appendChild(div);
    });
}

saveBtn.onclick = () => {
  if (!titleInput.value || !contentInput.value) return;

  notes.unshift({
    title: titleInput.value,
    content: contentInput.value,
  });

  localStorage.setItem("focuspad-notes", JSON.stringify(notes));
  titleInput.value = "";
  contentInput.value = "";
  renderNotes();
};

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("focuspad-notes", JSON.stringify(notes));
  renderNotes();
}

function editNote(index) {
  titleInput.value = notes[index].title;
  contentInput.value = notes[index].content;
  deleteNote(index);
}

searchInput.oninput = (e) => {
  renderNotes(e.target.value.toLowerCase());
};

renderNotes();
