import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { archiveNote, deleteNote, getActiveNotes } from '../../utils/local-data';
import { FaPlus } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';
import { TbArchive } from 'react-icons/tb';
import { MdDelete } from 'react-icons/md';
import { showFormattedDate } from '../../utils';
import PropTypes from 'prop-types';

const HomePage = ({ keyword }) => {
  const [activeNotes, setActiveNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let notes = getActiveNotes();

    if (keyword) {
      notes = notes.filter((note) =>
        note.title.toLowerCase().includes(keyword.toLowerCase()) ||
        note.body.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    setActiveNotes(notes);  
  }, [keyword]);

  const handleGetDetailed = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleDeleteNote = (id) => {
    deleteNote(id);
    setActiveNotes(getActiveNotes());
  };

  const handleArchive = (id) => {
    archiveNote(id);
    setActiveNotes(getActiveNotes());
  };

  return (
    <section className="app-container">
      { activeNotes.length ? (
          <div className="notes-list">
            {activeNotes.map((note, index) => (
              <div key={index} className="notes-item card bg-dark text-light p-4 shadow-sm rounded-3 border-0 g-4">
                  <div className="fw-bold note-item__title">{ note.title }</div>
                  <div className="note-item__createdAt">{ showFormattedDate(note.createdAt) }</div>
                  <div className="note-item__body mb-4">{ note.body }</div>
                  <div className="d-flex flex-row gap-3">
                        <button type="button" className="action" data-bs-toggle="tooltip" data-bs-placement="top" title="Detail notes" onClick={ () => handleGetDetailed(note.id) }><IoMdEye color='white'/></button>	
                        <button type="button" className="action" data-bs-toggle="tooltip" data-bs-placement="top" title="Archive note" onClick={ () => handleArchive(note.id) }><TbArchive color='white'/></button>
                        <button type="button" className="action" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete notes" onClick={ () => handleDeleteNote(note.id) }><MdDelete color='white'/></button>
                  </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="note-list-empty d-flex position-relative justify-content-center align-items-center" style={{ height: '50vh' }}>
            <div className="text-white text-center">
              <h3>No Notes Available</h3>
              <p>Please add a new note to get started.</p>
            </div>
          </div>
      )}
      <Link className="d-flex p-3 rounded-3 position-sticky btn-add float-end me-3 action" to="/note/new"><FaPlus /></Link>
    </section>
  );
};

export default HomePage;

HomePage.propTypes = {
  keyword: PropTypes.string.isRequired
}
