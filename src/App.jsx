import React from 'react';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import { Route, Routes } from 'react-router-dom';
import ArchivePage from './pages/ArchivePage';
import AddNotePage from './pages/AddNotePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
        <Route path='/' element={ <HomePage /> }/>
        <Route path='/detail/:id' element={ <DetailPage /> }/>
        <Route path='/archive' element={ <ArchivePage /> } />
        <Route path='/note/new' element={ <AddNotePage /> } /> 
        <Route path='*' element={ <NotFoundPage /> } />
    </Routes>
  );
}

export default App;
