import React from 'react';
import PropTypes from 'prop-types';
import './notesItem.css';

function NotesItem({ text, id, deleteItem }) {
  return (
    <li className="notesItem">
      <button className="notesItem__deleteItem" type="button" onClick={() => deleteItem(id)}>
        <span className="material-icons highlight_off">
          highlight_off
        </span>
      </button>
      <p>
        {text}
      </p>
    </li>
  );
}

NotesItem.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default NotesItem;
