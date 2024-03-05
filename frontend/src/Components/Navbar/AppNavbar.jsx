import React from 'react';
import './AppNavbar.css';
import { NavLink } from 'react-router-dom';
import GitSearchIcon from '../Assets/GitSearch.png'; // Correct way to import a PNG image

const AppNavbar = (props) => {

return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img src={GitSearchIcon} alt="" className='logo' />
        </div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Search</NavLink>
            </li>
            <li>
              <NavLink to="/favorites">Favorites</NavLink>
            </li>
            <li>
              <NavLink to="/projects">Github</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}


export default AppNavbar; 