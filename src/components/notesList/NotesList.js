/* eslint-disable react/forbid-prop-types */
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
  notes: PropTypes.array.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default NotesList;
