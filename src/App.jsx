import { Suspense, useEffect, useMemo, useState } from 'react';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import ArchivePage from './pages/ArchivePage';
import AddNotePage from './pages/AddNotePage';
import NotFoundPage from './pages/NotFoundPage';
import SearchBar from './components/SearchBar/SearchBar';
import { useSearchParams } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { getUserLogged } from './utils/network-data';
import { LuLogOut } from 'react-icons/lu';
import ThemeContext from './ThemeContext/ThemeContext';
import LoadingPage from './components/LoadingPage/LoadingPage';
import ToggleChangeTheme from './components/ToggleChangeTheme/ToggleChangeTheme';


function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [initializing, setInitializing] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const navigate = useNavigate();
  const keyword = searchParams.get('keyword') || '';
  const handleSearch = (query) => {
    setSearchParams({ keyword: query });
  };
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    const response = await getUserLogged();
    if (!response.error && response.data) {
      setAuthedUser(response.data);
    }
    setInitializing(false);
  };
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
    navigate('/login');
  }
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(theme === 'dark' ? 'light' : 'dark');
    localStorage.setItem('theme', newTheme); 
  };
  const themeContextValue = useMemo(() =>{
    return {
      theme,
      toggleTheme
    }
  }, [theme])

  if(authedUser === null){
    return (
      <div className='contact-app'>
          <header className='contact-app__header'>
            <h1>Aplikasi Kontak</h1>
          </header>

          <main>
            <Routes>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/*" element={<LoginPage onLoginSuccess={ onLoginSuccess }/>} />
            </Routes>
          </main>
      </div>
    )
  }

  return (  
    <>
      <ThemeContext.Provider value={themeContextValue}>
        <Suspense fallback={<LoadingPage />}>
          <nav className="navbar navbar-expand-lg py-3"> 
            <div className="container-fluid">
                  <a className="navbar-brand">Notes App</a>
                  <button className="bg-white navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
                      <ul className=" nav nav-underline gap-2">
                          <li className="nav-item">
                              <Link className="pb-1  nav-link text-decoration-none" to="/home">Home</Link>
                          </li>
                          <li className="nav-item">
                              <Link className="pb-1  nav-link text-decoration-none" to="/archive">Archive</Link>
                          </li>
                      </ul>
                      <div className="nav">
                        <SearchBar onSearch={ handleSearch }/>
                        <ToggleChangeTheme/>
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

          <footer className="bg-dark  bottom-0 py-3 position-relative w-100 d-flex">
            <p className="mb-0 text-center w-100">© {new Date().getFullYear()} Yusni Anggara. All rights reserved.</p>
          </footer>
        </Suspense>
      </ThemeContext.Provider>
    </>
      
  )
}

export default App;
