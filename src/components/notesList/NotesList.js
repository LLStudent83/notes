import React from 'react';
import PropTypes from 'prop-types';
import NotesItem from '../notesItem/NotesItem';
import './notesList.css';

function NotesList({ notes, deleteItem }) {
  return (
    <ul className="notesList__list">
      {notes.map((note) => (
        <NotesItem
          text={note.content}
          key={note.id}
          id={note.id}
          deleteItem={deleteItem}
        />
      ))}
    </ul>
  );
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string,
    id: PropTypes.string,
  })).isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default NotesList;
