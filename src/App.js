import React, { useState, useEffect } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  // Charger les notes depuis le localStorage au démarrage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  // Sauvegarder les notes dans le localStorage chaque fois qu'elles changent
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (newNote.trim() === '') return;
    setNotes([...notes, newNote]);
    setNewNote('');
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((note, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">My Notes</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write your note here..."
        />
        <button className="btn btn-primary" onClick={handleAddNote}>Add Note</button>
      </div>
      <ul className="list-group">
        {notes.map((note, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {note}
            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteNote(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
