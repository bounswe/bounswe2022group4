import React, { useEffect } from 'react';
import { NavLink as Link } from 'react-router-dom';
import './Navbar.css';
import SearchBar from '../SearchBar/SearchBar';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [authToken, setAuthToken] = React.useState('');
  const [loggedUser, setLoggedUser] = React.useState('');
  useEffect(() => {
    setLoggedUser(localStorage['user']);
  }, [localStorage['user']]);
  useEffect(() => {
    setAuthToken(localStorage['authToken']);
  }, [localStorage['authToken']]);
  return (
    <>
      <nav className='navv'>
        <FaBars className='bars' />
        <div className='navv-menu'>
          <Link to='/' activeStyle className='navv-link'>
            Home
          </Link>
          {authToken && (
            <Link
              to={'/profile/' + loggedUser}
              activeStyle
              className='navv-link'
            >
              Profile
            </Link>
          )}
          {authToken && (
            <Link to='/edit-profile' activeStyle className='navv-link'>
              Edit Profile
            </Link>
          )}
        </div>
        <SearchBar />
        {!authToken ? (
          <div className='navv-button'>
            <Link to='/sign-in' className='navv-button-link'>
              Sign In
            </Link>
            <Link to='/sign-up' className='navv-button-link'>
              Sign Up
            </Link>
          </div>
        ) : (
          <div
            className='navv-button'
            onClick={() => {
              localStorage.removeItem('authToken');
            }}
          >
            <a href='/sign-in' className='navv-button-link'>
              Sign Out
            </a>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
