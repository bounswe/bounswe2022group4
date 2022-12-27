import React, { useEffect } from 'react';
import { NavLink as Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import SearchBar from '../SearchBar/SearchBar';
import { FaBars } from 'react-icons/fa';
import logo from './logo.svg';

const Navbar = () => {
  const [authToken, setAuthToken] = React.useState('');
  const [loggedUser, setLoggedUser] = React.useState('');
  const location = useLocation();
  useEffect(() => {
    setLoggedUser(localStorage['user']);
  }, [location]);
  useEffect(() => {
    setAuthToken(localStorage['authToken']);
  }, [location]);
  return (
    <>
      <nav className='navv'>
        <FaBars className='bars' />
        <div
          className='navv-logo'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Link to='/' className='navv-logo-link'>
            <img
              src={logo}
              alt='logo'
              className='navv-logo-img'
              style={{
                height: '50px',
              }}
            />
          </Link>
        </div>
        <div className='navv-menu'>
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
          <Link to='/chatbot' activeStyle className='navv-link'>
            ChatBot
          </Link>
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
