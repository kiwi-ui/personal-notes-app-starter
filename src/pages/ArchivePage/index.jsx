import { useEffect, useState } from 'react'
import { getArchivedNotes, unarchiveNote } from '../../utils/local-data';
import { TbArchiveOff } from 'react-icons/tb';
import { showFormattedDate } from '../../utils';

const ArchivePage = ({ keyword }) => {
  const [archivedNotes, setArchivedNotes] = useState([])
  
  useEffect(() => {
    const a = getArchivedNotes()
    if (keyword){
      const filteredNotes = a.filter((note) =>
      note.title.toLowerCase().includes(keyword.toLowerCase()) ||
      note.body.toLowerCase().includes(keyword.toLowerCase())
    );
    console.log(filteredNotes)
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
      <section className="app-container d-flex align-items-center p-5">
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
          <div className="note-list-empty position-absolute top-50 start-50"> 
              <p className="text-white">"Tidak ada catatan"</p> 
          </div> 
        }
        
      </section>
  )
}

export default ArchivePage
