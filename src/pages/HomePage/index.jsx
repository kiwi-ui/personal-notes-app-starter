import { FaPlus } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { TbArchive } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../../utils';
import PropTypes from 'prop-types';

const HomePage = ({ notes, handleGetDetailed, handleDeleteNote, handleArchive } ) => {
  return (
    <section className="app-container">
      { notes.length ? 
        <div className="notes-list">
          { notes.map((note, index) =>
            { return (
              <div key={ index} className="notes-item card bg-dark text-light p-4 shadow-sm rounded-3 border-0 g-4">
                  <div className="fw-bold note-item__title">
                    { note.title }
                  </div>

                  <div className="note-item__createdAt">
                    { showFormattedDate(note.createdAt) }
                  </div>

                  <div className="note-item__body mb-4">
                    { note.body }
                  </div>

                  <div className="d-flex flex-row gap-3">
                      <button type="button" className="action" data-bs-toggle="tooltip" data-bs-placement="top" title="Detail notes" onClick={ () => handleGetDetailed(note.id) }><IoMdEye color='white'/></button>	
                      <button type="button" className="action" data-bs-toggle="tooltip" data-bs-placement="top" title="Archive note" onClick={ () => handleArchive(note.id) }><TbArchive color='white'/></button>
                      <button type="button" className="action" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete notes" onClick={ () => handleDeleteNote(note.id) }><MdDelete color='white'/></button>
                  </div>
                </div>
              ) 
            })
          }
        </div> 
        :
        <div className="note-list-empty d-flex position-relative justify-content-center align-items-center" style={{height: '50vh'}}>
            <p className="text-white text-center">
                <h3>No Notes Available</h3>
                <p>Please add a new note to get started.</p>
            </p> 
        </div> 
      }
        <Link type="button" className=" d-flex  p-3 rounded-3 position-sticky btn-add float-end me-3 action" to="/note/new"><FaPlus /></Link>
    </section> 
  )
}

export default HomePage;

HomePage.propTypes = {
  notes: PropTypes.array.isRequired,
  handleGetDetailed: PropTypes.func.isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
  handleArchive: PropTypes.func.isRequired
}
