import React from 'react';
import { useState } from 'react';
import './App.css';
import './Components/Search/SearchComponent.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar/AppNavbar';
import SearchComponent from './Components/Search/SearchComponent';
import Footer from './Components/Footer/Footer.jsx';
import Pagination from './Components/Pagination/Pagination.jsx';

const App = () => {
  return (
    <BrowserRouter>
    <div className='App'>
      <Navbar />
      <SearchComponent/>
      <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
