import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import { Link, Route, Routes } from 'react-router-dom';
import ArchivePage from './pages/ArchivePage';
import AddNotePage from './pages/AddNotePage';
import NotFoundPage from './pages/NotFoundPage';
import SearchBar from './components/SearchBar/SearchBar';
import { archiveNote, deleteNote, getActiveNotes } from './utils/local-data';
import { useNavigate, useSearchParams } from 'react-router-dom';


function App() {
  const [notes, setNotes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const navigate = useNavigate();

  useEffect (() => {
    const activeNotes = getActiveNotes();
    if (keyword) {
      const filteredNotes = activeNotes.filter((note) =>
        note.title.toLowerCase().includes(keyword.toLowerCase()) ||
        note.body.toLowerCase().includes(keyword.toLowerCase())
      );

      setNotes(filteredNotes);
      console.log(notes)
    } else {
      setNotes(activeNotes);
    }
  }, [keyword]);

  const handleSearch = (query) => {
    setSearchParams({ keyword: query });
  };

  const handleGetDetailed = (id) => {
    navigate(`/detail/${ id }`);
  };

  const handleDeleteNote = (id) => {
    const confirmDelete = window.confirm('Yakin ingin menghapus catatan ini?');

    if(confirmDelete){
      deleteNote(id);
      setNotes(getActiveNotes());
    }
  };

  const handleArchive = (id) => {
    archiveNote(id);
    setNotes(getActiveNotes());
  };

  return (
    <>
        <nav className="navbar navbar-expand-lg py-3">
            <div className="container-fluid">
                <a className="text-white navbar-brand">Notes App</a>
                <button className="bg-white navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
                    <ul className=" nav nav-underline gap-2">
                        <li className="nav-item">
                            <Link className="pb-1 text-white nav-link text-decoration-none" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="pb-1 text-white nav-link text-decoration-none" to="/archive">Archive</Link>
                        </li>
                    </ul>
                    <SearchBar onSearch={ handleSearch }/>
                </div>
            </div>
        </nav>

        <main>
            <Routes>
                <Route 
                  path='/' 
                  element= { 
                    <HomePage 
                      notes = { notes } 
                      setNotes = { setNotes } 
                      setSearchParams = { setSearchParams }
                      handleSearch = { handleSearch }
                      handleGetDetailed = { handleGetDetailed }
                      handleDeleteNote = { handleDeleteNote }
                      handleArchive = { handleArchive }
                      navigate= { navigate }
                    /> 
                  }
                />
                <Route path='/detail/:id' element={ <DetailPage /> }/>
                <Route path='/archive' element={ <ArchivePage keyword = { keyword } /> } />
                <Route path='/note/new' element={ <AddNotePage setNotes = { setNotes } /> } /> 
                <Route path='*' element={ <NotFoundPage /> } />
            </Routes>
        </main>

        <footer className="bg-dark text-white bottom-0 py-3 position-relative w-100 d-flex">
            <p className="mb-0 text-center w-100">© {new Date().getFullYear()} Yusni Anggara. All rights reserved.</p>
        </footer>
    </>
  );
}

export default App;
