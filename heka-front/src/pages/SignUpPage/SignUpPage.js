import React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BackendApi } from '../../api';
import { FaUserCircle, FaKey, FaAddressBook } from 'react-icons/fa';
import { AiFillDownCircle, AiOutlineLogin } from 'react-icons/ai';
import { Tabs, Tab, Content } from '../../components/Tab/Tab';

const SignUpPage = () => {
  const [active, setActive] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const validEmail = (e) => {
    var filter =
      /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(e).search(filter) !== -1;
  };
  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      username.length !== 0 &&
      password.length !== 0 &&
      email &&
      validEmail(email)
    ) {
      const response = await BackendApi.postRegister(email, username, password);
      if (response.status === 200) {
        setIsAuthenticated(true);
      } else if (response.status === 400) {
        alert('This e-mail had already been registered!');
        setUsername('');
        setEmail('');
        setPassword('');
      }
    } else {
      alert('Please enter valid registration information!');
      setUsername('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/sign-in' replace={true} />
      ) : (
        <>
          <Tabs>
            <Tab onClick={handleClick} active={active === 0} id={0}>
              Regular User
            </Tab>

            <Tab onClick={handleClick} active={active === 1} id={1}>
              Doctor
            </Tab>
          </Tabs>

          <Content active={active === 0}>
            <div className='general-login-container'>
              <form className='general-form-component'>
                <div className='con'>
                  <div className='head-form'>
                    <h2>Sign Up</h2>
                    <span>
                      <SignUpHead />
                    </span>
                  </div>
                  <div className='field-set'>
                    <div className='input-component'>
                      <span className='input-item'>
                        <FaAddressBook />
                      </span>
                      <input
                        className='form-input'
                        type='text'
                        placeholder='Email'
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className='input-component'>
                      <span className='input-item'>
                        <FaUserCircle />
                      </span>
                      <input
                        className='form-input'
                        type='text'
                        placeholder='Username'
                        required
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      />
                    </div>
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
                        }}
                      ></input>
                    </div>
                    <button className='login-button' onClick={handleSubmit}>
                      Sign Up
                      <AiOutlineLogin aria-hidden='true' />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Content>
          <Content active={active === 1}>
            <div className='general-login-container'>
              <form className='general-form-component'>
                <div className='con'>
                  <div className='head-form'>
                    <h2>Sign Up</h2>
                    <span>
                      <SignUpHead />
                    </span>
                  </div>
                  <div className='field-set'>
                    <div className='input-component'>
                      <span className='input-item'>
                        <FaAddressBook />
                      </span>
                      <input
                        className='form-input'
                        type='text'
                        placeholder='Email'
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className='input-component'>
                      <span className='input-item'>
                        <FaUserCircle />
                      </span>
                      <input
                        className='form-input'
                        type='text'
                        placeholder='Username'
                        required
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      />
                    </div>
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
                        }}
                      ></input>
                    </div>
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
                        }}
                      ></input>
                    </div>
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
                        }}
                      ></input>
                    </div>
                    <button className='login-button' onClick={handleSubmit}>
                      Sign Up
                      <AiOutlineLogin aria-hidden='true' />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Content>
        </>
      )}
    </>
  );
};

const SignUpHead = () => (
  <div id='signUpHead'>
    <label>You can register our application from below</label>
    <br></br>
    <br></br>
    <AiFillDownCircle aria-hidden='true' />
  </div>
);

export default SignUpPage;
