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
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { getUserLogged } from './utils/network-data';
import { LuLogOut } from 'react-icons/lu';


function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [initializing, setInitializing] = useState(true);
  const Navigate = useNavigate();
  const keyword = searchParams.get('keyword') || '';
  const handleSearch = (query) => {
    setSearchParams({ keyword: query });
  };
  useEffect(() => {
    const fetchUser = async () => {
        const response = await getUserLogged();
        if (!response.error && response.data) {
          setAuthedUser(response.data);
        }
        setInitializing(false);
    };

    fetchUser();
  }, []);
  const onLoginSuccess = () => {
    getUserLogged().then((response) => {
        if (!response.error && response.data) {
        setAuthedUser(response.data);
        }
    });
  }  
  const onLogoutSuccess = () => {
      localStorage.removeItem('accessToken');
      setAuthedUser(null);
      Navigate('/login');
  }

  if(authedUser === null){
    return (
        <div className='contact-app'>
          <header className='contact-app__header'>
            <h1>Aplikasi Kontak</h1>
          </header>
          <main>
            <Routes>
              <Route path="/*" element={<LoginPage onLoginSuccess={ onLoginSuccess }/>} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
    )
  }

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
                              <Link className="pb-1 text-white nav-link text-decoration-none" to="/home">Home</Link>
                          </li>
                          <li className="nav-item">
                              <Link className="pb-1 text-white nav-link text-decoration-none" to="/archive">Archive</Link>
                          </li>
                      </ul>
                      <div className="nav">
                        <SearchBar onSearch={ handleSearch }/>
                        <button className='btn btn-lg' type="button" onClick={onLogoutSuccess}><LuLogOut color='white'/></button>
                      </div>
                  </div>
              </div>
          </nav>

          <main>
            <Routes>
                <Route path='/home' element= { <HomePage keyword={ keyword }/> }/>
                <Route path='/detail/:id' element={ <DetailPage /> }/>
                <Route path='/archive' element={ <ArchivePage keyword = { keyword } /> } />
                <Route path='/note/new' element={ <AddNotePage /> } /> 
                <Route path='*' element={ <NotFoundPage /> } />
              </Routes>
          </main>

          <footer className="bg-dark text-white bottom-0 py-3 position-relative w-100 d-flex">
            <p className="mb-0 text-center w-100">© {new Date().getFullYear()} Yusni Anggara. All rights reserved.</p>
          </footer>
      </>
      
  )
}

export default App;
