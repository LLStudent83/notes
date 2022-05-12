import React from 'react';
import NotesList from '../notesList/NotesList';
import './notesApp.css';

export default class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteText: '',
      notesListState: [],
    };
  }

  componentDidMount() {
    this.updateNotesList();
  }

  onChangeTextarea = ({ target }) => {
    this.setState({ noteText: target.value });
  };

  updateNotesList = async () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/notes/`)
      .then((response) => response.json())
      .then((notes) => {
        this.setState({ notesListState: notes });
      });
  };

  sendNote = async () => {
    const { noteText } = this.state;
    if (noteText === '') return;
    const noteObj = {
      content: noteText,
    };
    const response = fetch(`${process.env.REACT_APP_BASE_URL}/notes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(noteObj),
    });
    return response;
  };

  deleteItem = (id) => {
    fetch(`${process.env.REACT_APP_BASE_URL}/notes/${id}/`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((notes) => {
        this.setState({ notesListState: notes });
      });
  };

  hendlSendNote = async () => {
    const response = await this.sendNote();

    if (response.ok) {
      this.updateNotesList();
    } else {
      return new Error((response.statusText));
    }

    this.setState({ noteText: '' });
  };

  hendlDeleteItem = (id) => {
    this.deleteItem(id);
  };

  render() {
    const { noteText, notesListState } = this.state;

    return (
      <div className="notesApp">
        <header className="notesApp__header">
          <h1>Notes</h1>
          <button className="notesApp__update" type="button" onClick={this.updateNotesList}>
            <span className="material-icons material-symbols-rounded">
              autorenew
            </span>
          </button>
        </header>
        <NotesList notes={notesListState} deleteItem={this.hendlDeleteItem} />
        <footer>
          <h4>New Note</h4>
          <div className="notesApp__textarea_wrapper">
            <textarea value={noteText} onChange={this.onChangeTextarea} />
            <button className="notesApp__send" type="button" onClick={this.hendlSendNote}>
              <span className="material-icons send">
                send
              </span>
            </button>
          </div>
        </footer>
      </div>
    );
  }
}
