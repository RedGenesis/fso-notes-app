import { useState, useEffect } from "react";
import Note from './components/Note';
import axios from "axios";
import noteService from "./services/notes";
import Notification from "./components/Notification";

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('some error happened...');
  
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      });
    // noteService
    //   .getAll()
    //   .then(response => {
    //     setNotes(response.data);
    //   });
  }, []);

  // useEffect(() => {
  //   console.log('effect');
  //   axios.get('http://localhost:3002/notes').then(response => {
  //     console.log('promise fulfilled');
  //     setNotes(response.data);
  //   });
  // }, []);
  // console.log('render', notes.length, 'notes');

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      });
    // noteService
    //   .create(noteObject)
    //   .then(response => {
    //     setNotes(notes.concat(response.data));
    //     setNewNote('');
    //   });
    // axios
    //   .post('http://localhost:3002/notes', noteObject)
    //   .then(response => {
    //     setNotes(notes.concat(response.data));
    //     setNewNote('');
    //   });
  }

  const toggleImportanceOf = (id) => {
    // const url = `http://localhost:3002/notes/${id}`;
    const note = notes.find(n => n.id === id);
    const changedNote = {...note, important: !note.important};

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      })
      .catch(error => {
        // alert(
        //   `the note '${note.content}' was already deleted from server`
        // );
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setNotes(notes.filter(n => n.id !== id));
      });
      // .update(id, changedNote)
      // .then(response => {
      //   setNotes(notes.map(n => n.id !== id ? n : response.data));
      // });
    // axios.put(url, changedNote).then(response => {
    //   setNotes(notes.map(n => n.id !== id ? n : response.data));
    // });
  }

  // const addNote = (event) => {
  //   event.preventDefault();
  //   console.log("button clicked", event.target);
  //   const noteObject = {
  //     content: newNote,
  //     important: Math.random() < 0.5,
  //     id: notes.length + 1,
  //   }

  //   setNotes(notes.concat(noteObject));
  //   setNewNote('');
  // }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value = {newNote}
          onChange= {handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App;