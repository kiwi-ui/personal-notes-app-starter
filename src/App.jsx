import React from 'react';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
  <Routes>
      <Route path='/' element={ <HomePage /> }/>
      <Route path='/:id' element={ <DetailPage /> }/>
  </Routes>
  );
}

export default App;
