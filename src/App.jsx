import React, { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import { Route, Routes } from 'react-router-dom';
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
      } else {
        setNotes(activeNotes);
      }
  }, [keyword])

  const handleSearch = (query) => {
    setSearchParams({keyword: query});
  }

  const handleGetDetailed = (id) => {
    navigate(`/detail/${ id }`);
  }

  const handleDeleteNote = (id) => {
    const confirmDelete = window.confirm('Yakin ingin menghapus catatan ini?');
    if(confirmDelete){
      deleteNote(id);
      setNotes(getActiveNotes());
    }
  }

  const handleArchive = (id) => {
    archiveNote(id);
    setNotes(getActiveNotes());
  }

  return (
    <>
        <nav className="navbar navbar-expand-lg bg-warning">
            <div className="container-fluid">
                <a className="navbar-brand">Notes App</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                        <a className="nav-link" href="#">Archive</a>
                    </div>
                </div>
                
                <SearchBar />
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
                <Route path='/archive' element={ <ArchivePage /> } />
                <Route path='/note/new' element={ <AddNotePage /> } /> 
                <Route path='*' element={ <NotFoundPage /> } />
            </Routes>
        </main>

        <footer></footer>
    </>
  );
}

export default App;
