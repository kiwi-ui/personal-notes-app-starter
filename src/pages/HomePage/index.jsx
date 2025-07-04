import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';
import { TbArchive } from 'react-icons/tb';
import { MdDelete } from 'react-icons/md';
import { showFormattedDate } from '../../utils';
import PropTypes from 'prop-types';
import { archiveNote, deleteNote, getActiveNotes } from '../../utils/network-data';
import LoadingIndicator from '../../components/loadingIndicator/LoadingIndicator';
import { useContext } from 'react';
import ThemeContext from '../../ThemeContext/ThemeContext';

const HomePage = ({ keyword }) => {
  const [activeNotes, setActiveNotes] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  
  useEffect(() => {
    const fetchAndFilterNotes = async () => {
      try {
        setLoading(true);
        const { data } = await getActiveNotes();

        const filtered = keyword
          ? data.filter((note) =>
              note.title.toLowerCase().includes(keyword.toLowerCase()) ||
              note.body.toLowerCase().includes(keyword.toLowerCase())
            )
          : data;

        setActiveNotes(filtered);
        setLoading(false);
      } catch (error) {
        alert("Gagal memuat catatan. Mungkin karena Anda tidak memiliki akses.");
      }
    };

    fetchAndFilterNotes();
  }, [keyword]);

  const handleGetDetailed = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleDeleteNote = async (id) => {
    const { error } = await deleteNote(id);
    if (error) {
      alert("Gagal menghapus catatan.");
      return;
    }
    alert("Catatan berhasil dihapus.");
    refreshNotes();
  };

  const handleArchive = async (id) => {
    const { error } = await archiveNote(id);
    if (error) {
      alert("Gagal mengarsipkan catatan.");
      return;
    }
    alert("Catatan berhasil diarsipkan.");
    refreshNotes();
  };

  const refreshNotes = async () => {
    try {
      const { data } = await getActiveNotes();
      const filtered = keyword
        ? data.filter((note) =>
            note.title.toLowerCase().includes(keyword.toLowerCase()) ||
            note.body.toLowerCase().includes(keyword.toLowerCase())
          )
        : data;

      setActiveNotes(filtered);
    } catch (error) {
      alert("Gagal memuat ulang catatan.");
    }
  };

  return (
    loading ? <LoadingIndicator /> :
    <section className="app-container">
      {activeNotes.length ? (
        <div className="notes-list">
          {activeNotes.map((note) => (
            <div key={note.id} className="note-item card p-4 shadow-sm rounded-3 border-0 g-4">
              <div className="fw-bold note-item__title">{note.title}</div>
              <div className="note-item__createdAt">{showFormattedDate(note.createdAt)}</div>
              <div className="note-item__body mb-4">{note.body}</div>
              <div className="d-flex flex-row gap-3">
                <button className={`${theme == 'dark' ? 'bg-light' : ''} action`} onClick={() => handleGetDetailed(note.id)}><IoMdEye color="white" /></button>
                <button className={`${theme == 'dark' ? 'bg-light' : ''} action`} onClick={() => handleArchive(note.id)}><TbArchive color="white" /></button>
                <button className={`${theme == 'dark' ? 'bg-light' : ''} action`} onClick={() => handleDeleteNote(note.id)}><MdDelete color="white" /></button>
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
      <Link className="d-flex p-3 rounded-3 border border-black position-sticky btn-add float-end me-3 action" to="/note/new"><FaPlus /></Link>
    </section>
  );
};

export default HomePage;

HomePage.propTypes = {
  keyword: PropTypes.string.isRequired
};
