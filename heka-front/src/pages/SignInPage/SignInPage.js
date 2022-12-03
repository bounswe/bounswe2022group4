import React, { Component } from 'react';
import { useState } from 'react';
import './SignInPage.css';
import validator from 'validator';
import { NavLink as Link, Navigate } from 'react-router-dom';
import { BackendApi } from '../../api';
import { FaUserCircle, FaKey, FaUserPlus } from 'react-icons/fa';
import { AiOutlineLogin } from 'react-icons/ai';
import { display } from '@mui/system';

const LoginForm = ({ setIsLogged, setAuthenticationToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err_message, setErrMessage] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [wrong_email_password, setWrong] = useState();
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await BackendApi.postLogin(username, password);
    setAuthenticationToken('Token ' + response.data.token);
    if (response.status >= 200 && response.status < 300) {
      setIsAuthenticated(true);
      setIsLogged(true);
    } else if (response.status === 403) {
      setWrong(true);
      /* alert('Invalid username or password'); */
    }

    if (validator.isEmail(username)) {
      //alert(username);
    } else {
      setErrMessage(true);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' replace={true} />
      ) : (
        <div className='general-login-container'>
          <form className='general-form-component'>
            <div className='con'>
              <div className='head-form'>
                <h2>Log In</h2>
                <p>
                  <NotRegistered />
                </p>
              </div>
              <div className='field-set'>
                <div className='input-component'>
                  <span className='input-item'>
                    <FaUserCircle />
                  </span>
                  <input
                    className='form-input'
                    type='text'
                    placeholder='Email'
                    required
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setErrMessage(false);
                      setWrong(false);
                    }}
                  />
                </div>
                {err_message ? (
                  <div className='error-msg'>
                    <i className='fa fa-times-circle'></i>
                    Please enter a valid email address
                  </div>
                ) : null}

                {wrong_email_password && !err_message ? (
                  <div className='error-msg'>
                    <i className='fa fa-times-circle'></i>
                    Invalid username or password
                  </div>
                ) : null}
                <div className='input-component'>
                  <span className='input-item'>
                    <FaKey />
                  </span>

                  <input
                    className='form-input'
                    type='password'
                    placeholder='Password'
                    name='password'
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setWrong(false);
                    }}
                  ></input>
                </div>
                <button className='login-button' onClick={handleSubmit}>
                  Log in
                  <AiOutlineLogin aria-hidden='true' />
                </button>
                <button
                  className='login-button'
                  style={{
                    margin: '0',
                  }}
                >
                  <Link
                    to='/sign-up'
                    style={{ color: '#252537', textDecoration: 'none' }}
                  >
                    Sign up
                  </Link>
                  <FaUserPlus aria-hidden='true' />
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

const NotRegistered = () => (
  <div id='Registered'>
    <label>Not Registered yet?</label>
    <br></br>
    <div>
      <a className='Link' href='/sign-up'>
        {' '}
        Sign Up{' '}
      </a>
    </div>
  </div>
);

export default LoginForm;
