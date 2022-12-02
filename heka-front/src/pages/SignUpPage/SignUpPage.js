import React from 'react';
import { useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { BackendApi } from '../../api';
import {
  FaUserCircle,
  FaKey,
  FaAddressBook,
  FaRegHospital,
} from 'react-icons/fa';
import {
  AiFillDownCircle,
  AiOutlineLogin,
  AiOutlineUpload,
  AiOutlineBranches,
} from 'react-icons/ai';
import { GiDoctorFace, GiDiploma } from 'react-icons/gi';
import { GrUserExpert } from 'react-icons/gr';
import { Tabs, Tab, Content } from '../../components/Tab/Tab';
import './SignUpPage.css';
const SignUpPage = () => {
  const [active, setActive] = useState(0);
  const [diploma, setDiploma] = useState(null);
  const [yearsofexp, setYearsofexp] = useState(0);
  const [branch, setBranch] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [email, setEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const validEmail = (e) => {
    var filter =
      /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(e).search(filter) !== -1;
  };
  const inputFields = [
    {
      placeholder: 'Full Name',
      onChange: (e) => setFullName(e.target.value),
      icon: <GiDoctorFace aria-hidden='true' />,
      value: fullName,
    },
    {
      placeholder: 'Institution Name',
      onChange: (e) => setInstitution(e.target.value),
      icon: <FaRegHospital aria-hidden='true' />,
      value: institution,
    },
    {
      placeholder: 'Years of Experience',
      onChange: (e) => setYearsofexp(e.target.value),
      icon: <GrUserExpert aria-hidden='true' />,
    },
    {
      placeholder: 'Branch',
      onChange: (e) => setBranch(e.target.value),
      icon: <AiOutlineBranches aria-hidden='true' />,
    },
    {
      placeholder: 'Diploma',
      onChange: (e) => setDiploma(e.target.value),
      icon: <GiDiploma aria-hidden='true' />,
    },
    {
      placeholder: 'Email',
      onChange: (e) => setEmail(e.target.value),
      icon: <FaAddressBook aria-hidden='true' />,
      value: email,
    },
    {
      placeholder: 'Username',
      onChange: (e) => setUsername(e.target.value),
      icon: <FaUserCircle aria-hidden='true' />,
      value: username,
    },
    {
      placeholder: 'Password',
      onChange: (e) => setPassword(e.target.value),
      icon: <FaKey aria-hidden='true' />,
      value: password,
    },
  ];
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
      console.log(response);
      if ((response.status >= 200) & (response.status < 300)) {
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

  const hiddenFileInput = React.useRef(null);

  const handleFileClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleFileChange = (event) => {
    setDiploma(event.target.files[0]);
  };

  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/sign-in' replace={true} />
      ) : (
        <>
          <Tabs>
            <Tab
              onClick={handleClick}
              active={active === 0}
              id={0}
              className='tab-text'
            >
              Regular User
            </Tab>

            <Tab
              onClick={handleClick}
              active={active === 1}
              id={1}
              className='tab-text'
            >
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
                  <br />
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
              <form
                className='general-form-component'
                style={{
                  height: '720px',
                }}
              >
                <div className='con'>
                  <div className='head-form'>
                    <h2>Sign Up</h2>
                    <span>
                      <SignUpHead />
                    </span>
                  </div>
                  <br />
                  <div className='field-set'>
                    {inputFields.map((inputField, index) => (
                      <>
                        {inputField.placeholder === 'Diploma' ? (
                          <div className='input-component' key={index}>
                            <span className='input-item'>
                              {inputField.icon}
                            </span>
                            <input
                              className='form-input'
                              type='text'
                              placeholder={inputField.placeholder}
                              required
                              value={diploma ? diploma.name : null}
                              onChange={(e) => {
                                inputField.onChange(e);
                              }}
                              style={{
                                width: '195px',
                                borderRadius: '0px 0px 0px 0px',
                              }}
                            />
                            <input
                              type='file'
                              ref={hiddenFileInput}
                              onChange={handleFileChange}
                              style={{ display: 'none' }}
                            />
                            <div
                              className='input-item-diploma'
                              onClick={handleFileClick}
                              style={{
                                cursor: 'pointer',
                              }}
                            >
                              <AiOutlineUpload />
                            </div>
                          </div>
                        ) : (
                          <div className='input-component' key={index}>
                            <span className='input-item'>
                              {inputField.icon}
                            </span>
                            <input
                              className='form-input'
                              type='text'
                              placeholder={inputField.placeholder}
                              required
                              value={inputField.value}
                              onChange={(e) => {
                                inputField.onChange(e);
                              }}
                            />
                          </div>
                        )}
                      </>
                    ))}

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
