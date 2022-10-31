import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import './Navbar.css';
import { FaBars } from 'react-icons/fa';

const Navbar = ({ isLogged }) => {
  return (
    <>
      <nav className='nav'>
        <FaBars className='bars' />
        <div className='nav-menu'>
          <Link to='/' activeStyle className='nav-link'>
            Home
          </Link>
          <Link to='/profile' activeStyle className='nav-link'>
            Profile
          </Link>
        </div>
        {!isLogged && (
          <div className='nav-button'>
            <Link to='/sign-in' className='nav-button-link'>
              Sign In
            </Link>
            <Link to='/sign-up' className='nav-button-link'>
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
