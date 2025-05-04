import React from 'react';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import { Route, Routes } from 'react-router-dom';
import ArchivePage from './pages/ArchivePage';
import AddNotePage from './pages/AddNotePage';

function App() {
  return (
    <Routes>
        <Route path='/' element={ <HomePage /> }/>
        <Route path='/:id' element={ <DetailPage /> }/>
        <Route path='/archive' element={ <ArchivePage /> } />
        <Route path='/notes/new' element={ <AddNotePage /> } /> 
    </Routes>
  );
}

export default App;
