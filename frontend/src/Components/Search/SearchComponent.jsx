import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Pagination from '../Pagination/Pagination';

const SearchComponent = () => {

    const [searchText, setSearchText] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 12;

    const fetchUsers = async (query) => {
        if (!query) {
            setUsers([]);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ searchText: query })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setUsers(data.data);
            setLoading(false);

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    // Debounced function
    const debouncedFetchUsers = _.debounce(fetchUsers, 300);

    useEffect(() => {
        debouncedFetchUsers(searchText);

        // Cleanup function to cancel the debounce on unmount
        return () => {
            debouncedFetchUsers.cancel();
        };
    }, [searchText]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const nPages = Math.ceil(users.length / usersPerPage);

 
    return (
    <div className='search-container'>
    <div className="d-flex pt-sm-9">
    <div className="col-1 d-flex flex-column events-none position-relative">
    <div className="mx-auto">
      <div className="d-inline-block circle p-1 style-7T4SU" id="style-7T4SU">
      </div>
    </div>
    <div className="home-campaign-git-line rounded mx-auto style-HJYxo" id="style-HJYxo">
    </div>
    <div className="mx-auto my-3 home-campaign-glowing-icon">
      <div className="position-relative d-inline-block z-1">
        <svg aria-hidden="true" height="24" viewBox="0 0 24 24" version="1.1" width="24" data-view-component="true" className="octicon octicon-code">
          <path d="M15.22 4.97a.75.75 0 0 1 1.06 0l6.5 6.5a.75.75 0 0 1 0 1.06l-6.5 6.5a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L21.19 12l-5.97-5.97a.75.75 0 0 1 0-1.06Zm-6.44 0a.75.75 0 0 1 0 1.06L2.81 12l5.97 5.97a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215l-6.5-6.5a.75.75 0 0 1 0-1.06l6.5-6.5a.75.75 0 0 1 1.06 0Z">
          </path>
        </svg>
        <span className="position-absolute left-0 top-0 height-full width-full home-campaign-glowing-icon-glow circle z-n1 style-ZyYIF" id="style-ZyYIF">
        </span>
      </div>
    </div>
    <div className="home-campaign-git-line height-full rounded mx-auto style-aq2GB" id="style-aq2GB">
    </div>
  </div>
        <div className="col-11 text-left pl-2 pl-sm-0 mt-n4">
            <div className="position-relative z-1 mb-2 mb-sm-6">
            </div>
            <h1 className="h0-mktg mb-3 position-relative">
                <span style={{ fontSize: '1.2em', color: 'white'}}>
                    Search Github Users&nbsp;
                </span>
            </h1>
            <p className="f2-mktg text-normal color-fg-muted mb-3 mb-md-10 position-relative z-1">
                The world’s leading Github search platform.
            </p>
            <div className="search-box">
                <input className="form-control f4-mktg" style={{ height: '3rem', width: '25rem'}} placeholder="Enter Username" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
            </div>
            <div className="my-8 col-12">
                <p className="d-block color-fg-subtle f3-mktg">
                    Github users will be displayed below&nbsp;↘︎
                </p>
            </div>
    </div>
        </div>
        <div className='user-cards'>
             <div className="user-grid">
                 {currentUsers.map(user => (
                 <div className="user-card" key={user.login}>
                     <img src={user.avatar_url} alt={user.login} />
                     <h3>{user.login}</h3>
                 </div>
             ))}
             </div>
        </div>
        <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
        />
    </div>
    );
}

export default SearchComponent;