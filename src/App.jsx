import React from 'react';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import { Route, Routes } from 'react-router-dom';
import ArchivePage from './pages/ArchivePage/ArchivePage';

function App() {
  return (
    <Routes>
        <Route path='/' element={ <HomePage /> }/>
        <Route path='/:id' element={ <DetailPage /> }/>
        <Route path='/archive' element={ <ArchivePage /> } />
    </Routes>
  );
}

export default App;
