import { useContext, useEffect, useState } from 'react';
import { TbArchiveOff } from 'react-icons/tb';
import { showFormattedDate } from '../../utils';
import PropTypes from 'prop-types';
import { getArchivedNotes, unarchiveNote } from '../../utils/network-data';
import LoadingIndicator from '../../components/loadingIndicator/LoadingIndicator';
import ThemeContext from '../../ThemeContext/ThemeContext';

const ArchivePage = ({ keyword }) => {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  useEffect(() => {
    const fetchArchivedNotes = async () => {
      try {
        setLoading(true);
        const { data } = await getArchivedNotes();
        
        const filteredNotes = keyword
          ? data.filter((note) =>
              note.title.toLowerCase().includes(keyword.toLowerCase()) ||
              note.body.toLowerCase().includes(keyword.toLowerCase())
            )
          : data;
  
        setArchivedNotes(filteredNotes);
        setLoading(false);
      } catch (error) {
        alert("Gagal memuat catatan. Mungkin karena Anda tidak memiliki akses.");
      }
    }

    fetchArchivedNotes();
  }, [keyword]);
  const refreshNotes = async () => {
    try {
      const { data } = await getArchivedNotes();
      const filtered = keyword
        ? data.filter((note) =>
            note.title.toLowerCase().includes(keyword.toLowerCase()) ||
            note.body.toLowerCase().includes(keyword.toLowerCase())
          )
        : data;

      setArchivedNotes(filtered);
    } catch (error) {
      alert("Gagal memuat ulang catatan.");
    }
  };
  const handleUnarchive = async (id) => {
    const { error } = await unarchiveNote(id);
    if (error) {
      alert("Gagal mengembalikan catatan. Mungkin karena Anda tidak memiliki akses.");
      return;
    }
    alert("Catatan berhasil dikembalikan");
    refreshNotes();
  };

  return (
      loading ? 
      <LoadingIndicator /> :
      <section className="app-container">
        {archivedNotes.length ? (
          <div className="notes-list">
            {archivedNotes.map((note) => (
              <div
                key={note.id}
                className="note-item card p-4 shadow-sm rounded-3 border-0 g-4"
              >
                <div className="note-item__title fw-bold">{note.title}</div>
                <div className="note-item__createdAt">
                  {showFormattedDate(note.createdAt)}
                </div>
                <div className="note-item__body mb-4">{note.body}</div>
                <button
                  className={`${theme == 'dark' ? 'bg-light' : ''} action`}
                  type="button"
                  onClick={() => handleUnarchive(note.id)}
                >
                  <TbArchiveOff />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="note-list-empty d-flex position-relative justify-content-center align-items-center"
            style={{ height: '50vh' }}
          >
            <div className="text-white text-center">
              <h3>No Notes Available</h3>
              <p>Please add a new note to get started.</p>
            </div>
          </div>
        )}
      </section>
  );
};

ArchivePage.propTypes = {
  keyword: PropTypes.string.isRequired,
};

export default ArchivePage;
