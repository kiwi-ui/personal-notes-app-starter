import { useEffect, useState } from 'react'
import { TbArchiveOff } from 'react-icons/tb';
import { showFormattedDate } from '../../utils';
import PropTypes from 'prop-types';
import { getArchivedNotes, unarchiveNote } from '../../utils/network-data';

const ArchivePage = ({ keyword }) => {
  const [archivedNotes, setArchivedNotes] = useState([])
  
  useEffect(() => {
    let notes = handleGetArchivedNotes();

    if (keyword){
      notes = notes.filter((note) =>
        note.title.toLowerCase().includes(keyword.toLowerCase()) ||
        note.body.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    setArchivedNotes(notes);
  }, [keyword])
  const handleGetArchivedNotes = async () => {
    const { data } = await getArchivedNotes();
    setArchivedNotes(data);
    return data
  }
  const handleUnarchive = async(id) => {
      const {data, error} = await unarchiveNote(id);

      if (error) {
        alert("Gagal mengembalikan catatan. Mungkin karena Anda tidak memiliki akses.");
        return;
      }
      alert("Catatan berhasil dikembalikan");
      handleGetArchivedNotes(); 
  }

  return (
      <section className="app-container">
        { archivedNotes.length ?
          <div className="notes-list">
            { archivedNotes.map((note, index) => 
              (
                <div key={ index } className="note-item card p-4 shadow-sm rounded-3 border-0 g-4">
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
              <div className="text-white text-center">
                  <h3>No Notes Available</h3>
                  <p>Please add a new note to get started.</p>
              </div> 
          </div> 
        }
      </section>
  )
}

export default ArchivePage;

ArchivePage.propTypes = {
  keyword: PropTypes.string.isRequired
}
