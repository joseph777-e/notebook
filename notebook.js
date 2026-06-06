const KEY = "notebook_data";
let currentId = null;
let filter = "all";

/* ===============================
   STORAGE
=================================*/

function loadNotes() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

function saveNotes(notes) {
  localStorage.setItem(KEY, JSON.stringify(notes));
}

/* ===============================
   RENDER
=================================*/

function render(search = "") {
  const list = document.getElementById("notes");
  const empty = document.getElementById("empty");
  list.innerHTML = "";

  let notes = loadNotes();

  // Sort pinned to top
  notes.sort((a, b) => b.pin - a.pin);

  if (notes.length === 0) {
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
  }

  notes.forEach(note => {
    if (filter === "fav" && !note.fav) return;
    if (filter === "pin" && !note.pin) return;

    if (
      !note.title.toLowerCase().includes(search.toLowerCase()) &&
      !note.content.toLowerCase().includes(search.toLowerCase())
    ) return;

    const card = document.createElement("div");
    card.className = "note-card";

    card.innerHTML = `
      <h3>${note.title || "Untitled"}</h3>
      <span>${note.date}</span>
    `;

    card.onclick = () => openNote(note.id);
    list.appendChild(card);
  });
}

/* ===============================
   CREATE NOTE
=================================*/

function addNote() {
  const notes = loadNotes();

  const newNote = {
    id: Date.now(),
    title: "",
    content: "",
    date: new Date().toLocaleString(),
    pin: false,
    fav: false
  };

  notes.unshift(newNote);
  saveNotes(notes);
  render();
  openNote(newNote.id);
}

/* ===============================
   OPEN NOTE
=================================*/

function openNote(id) {
  const notes = loadNotes();
  const note = notes.find(n => n.id === id);
  if (!note) return;

  currentId = id;

  document.getElementById("editor").style.display = "flex";
  document.getElementById("empty").style.display = "none";

  document.getElementById("title").value = note.title;
  document.getElementById("content").value = note.content;
  document.getElementById("date").textContent = note.date;

  updateActionButtons(note);
}

/* ===============================
   UPDATE INPUT
=================================*/

document.getElementById("title").addEventListener("input", saveCurrentNote);
document.getElementById("content").addEventListener("input", saveCurrentNote);

function saveCurrentNote() {
  if (!currentId) return;

  const notes = loadNotes();
  const note = notes.find(n => n.id === currentId);
  if (!note) return;

  note.title = document.getElementById("title").value;
  note.content = document.getElementById("content").value;

  saveNotes(notes);
  render();
}

/* ===============================
   DELETE
=================================*/

function removeNote() {
  if (!currentId) return;

  let notes = loadNotes();
  notes = notes.filter(n => n.id !== currentId);

  saveNotes(notes);

  currentId = null;
  document.getElementById("editor").style.display = "none";
  render();
}

/* ===============================
   PIN
=================================*/

function togglePin() {
  if (!currentId) return;

  const notes = loadNotes();
  const note = notes.find(n => n.id === currentId);
  if (!note) return;

  note.pin = !note.pin;

  saveNotes(notes);
  updateActionButtons(note);
  render();
}

/* ===============================
   FAVORITE
=================================*/

function toggleFav() {
  if (!currentId) return;

  const notes = loadNotes();
  const note = notes.find(n => n.id === currentId);
  if (!note) return;

  note.fav = !note.fav;

  saveNotes(notes);
  updateActionButtons(note);
  render();
}

/* ===============================
   FILTER
=================================*/

function setFilter(type, btn) {
  filter = type;

  document.querySelectorAll(".tabs button").forEach(b =>
    b.classList.remove("active")
  );

  btn.classList.add("active");
  render();
}

function searchNotes(text) {
  render(text);
}

/* ===============================
   UI STATE
=================================*/

function updateActionButtons(note) {
  const pinBtn = document.getElementById("pinBtn");
  const favBtn = document.getElementById("favBtn");

  if (note.pin) {
    pinBtn.classList.add("active");
  } else {
    pinBtn.classList.remove("active");
  }

  if (note.fav) {
    favBtn.classList.add("active");
  } else {
    favBtn.classList.remove("active");
  }
}

/* ===============================
   INIT
=================================*/

window.addEventListener("DOMContentLoaded", () => {
  render();
});