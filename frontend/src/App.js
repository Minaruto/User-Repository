import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/AppNavbar';
import SearchComponent from './Components/Search/SearchComponent';
import Footer from './Components/Footer/Footer.jsx';
import Favorite from './Components/Favorite/Favorite.jsx';

const App = () => {
  return (
    <BrowserRouter>
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchComponent />} />
        <Route path="/search" element={<SearchComponent />} />
        <Route path="/favorites" element={<Favorite />} />
      </Routes>
      <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
