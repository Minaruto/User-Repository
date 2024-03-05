import React from 'react';
import { useState, useEffect } from 'react';
import Heart from 'react-animated-heart';
import './Favorite.css';

const Favorite = () => {
    const [favorites, setFavorites] = useState([]);
    const [isClick, setClick]  = useState([]);
  
    useEffect(() => {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(storedFavorites);
    }, []);

  
    return (
      <div>
        <h2>Favorited Users</h2>
        <div className='user-grid'>
          {favorites.map((user) => (
                 <div className="user-card" key={user.login}>
                 <div className='save-button'>
                 <Heart isClick={favorites.includes(user.login)} onClick={() => toggleFavorite(user.login)}/>
                 </div>
                 <div>
                  <img src={user.avatar_url} alt={user.login} />
                  <h3>{user.login}</h3>
                 </div>
              </div>
          ))}
        </div>
      </div>
    );
  };

  export default Favorite; 