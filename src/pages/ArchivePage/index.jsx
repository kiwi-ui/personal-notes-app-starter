import { useEffect, useState } from 'react'
import { getArchivedNotes, unarchiveNote } from '../../utils/local-data';
import { TbArchiveOff } from 'react-icons/tb';
import { showFormattedDate } from '../../utils';

const ArchivePage = ({ keyword }) => {
  const [archivedNotes, setArchivedNotes] = useState([])
  
  useEffect(() => {
    const notes = getArchivedNotes();
    if (keyword){
      const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(keyword.toLowerCase()) ||
      note.body.toLowerCase().includes(keyword.toLowerCase())
    );
    setArchivedNotes(filteredNotes);
    } else {
      setArchivedNotes(getArchivedNotes());
    }
  }, [keyword])

  const handleUnarchive = (id) => {
      unarchiveNote(id);
      setArchivedNotes(getArchivedNotes());
  }

  return (
      <section className="app-container">
        { archivedNotes.length ?
          <div className="notes-list">
            { archivedNotes.map((note, index) => 
              (
                <div key={ index } className="notes-item bg-dark container text-white p-5">
                    <div className="note-item__title">
                      { note.title }
                    </div>

                    <div className="note-item__createdAt">
                      { showFormattedDate(note.createdAt) }
                    </div>

                    <div className="note-item__body mb-4">
                      { note.body }
                    </div>
                    <button className="action" type="button" onClick={ () => handleUnarchive(note.id) }><TbArchiveOff /></button>
                </div>
              ))
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
        
      </section>
  )
}

export default ArchivePage
