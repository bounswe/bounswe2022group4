import React from 'react';
import { useState, useRef } from 'react';
import { Navigate,  } from 'react-router-dom';
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
  const [isExpert, setIsExpert] = useState(false);
  const [branch, setBranch] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [password3, setPassword3] = useState('');
  const [confirmationErr, setConfirmationErr] = useState();
  const [passwordReqErr, setPasswordReqErr] = useState();

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
      type: 'text',
    },
    {
      placeholder: 'Institution Name',
      onChange: (e) => setInstitution(e.target.value),
      icon: <FaRegHospital aria-hidden='true' />,
      value: institution,
      type: 'text',
    },
    {
      placeholder: 'Years of Experience',
      onChange: (e) => setYearsofexp(e.target.value),
      icon: <GrUserExpert aria-hidden='true' />,
      type: 'text',
    },
    {
      placeholder: 'Branch',
      onChange: (e) => setBranch(e.target.value),
      icon: <AiOutlineBranches aria-hidden='true' />,
      type: 'text',
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
      type: 'text',
    },
    {
      placeholder: 'Username',
      onChange: (e) => setUsername(e.target.value),
      icon: <FaUserCircle aria-hidden='true' />,
      value: username,
      type: 'text',
    },
    {
      placeholder: 'Password',
      onChange: (e) => setPassword(e.target.value),
      icon: <FaKey aria-hidden='true' />,
      value: password,
      type: 'password',
    },
    
  ];
  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };
  const handleDoctorSubmit = async (e) => {
    e.preventDefault();

    console.log('isExpert', isExpert);
    console.log('username', username);
    console.log('password', password);
    console.log('email', email);
    
    if (
      username.length !== 0 &&
      password.length !== 0 &&
      email &&
      validEmail(email)
    ) {
      const response = await BackendApi.postRegister(
        email,
        username,
        password,
        true
      );
      console.log(response);
      if ((response.status >= 200) & (response.status < 300)) {
        setIsAuthenticated(true);
        const response_1 = await BackendApi.postEmail(email);
      } else if (response.status === 400) {
        alert('This e-mail or username had already been registered!');
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
  const handleRegularSubmit = async (e) => {
    e.preventDefault();

    console.log('isExpert', isExpert);
    console.log('username', username);
    console.log('password', password);
    console.log('email', email);
    if (
      username.length !== 0 &&
      password2.length !== 0 &&
      email && password2 == password3 && 
      validEmail(email)
    ) {
      setIsExpert(false);
      const response = await BackendApi.postRegister(
        email,
        username,
        password2,
        isExpert
      );
      console.log(response);
      
      if ((response.status >= 200) & (response.status < 300)) {
        setIsAuthenticated(true);
        const response_2 = await BackendApi.postEmail(email);
      } else if (response.status === 400) {
        alert('This e-mail or username had already been registered!');
        setUsername('');
        setEmail('');
        setPassword2('');
        setPassword3('');
      }
    } else {
      var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
      if(!(password2.match(passw)))
      {
        setPasswordReqErr(true);
        setUsername('');
        setEmail('');
        setPassword2('');
        setPassword3(''); 
      }
      else if (password2 != password3){
        setConfirmationErr(true);
        setUsername('');
        setEmail('');
        setPassword2('');
        setPassword3('');
      }
      else {
        alert('Please enter valid registration information!');
        setUsername('');
        setEmail('');
        setPassword2('');
        setPassword3('');
      }
      
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
        <Navigate to='/sign-up-verification'  replace={true} />
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
                          setConfirmationErr(false);
                          setPasswordReqErr(false);

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
                          setPasswordReqErr(false);
                          setUsername(e.target.value);
                          setConfirmationErr(false);
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
                        name='password2'
                        required
                        value={password2}
                        onChange={(e) => {
                          setPasswordReqErr(false);
                          setPassword2(e.target.value);
                          setConfirmationErr(false);
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
                        placeholder='Confirm Password'
                        name='password3'
                        required
                        value={password3}
                        onChange={(e) => {
                          setPasswordReqErr(false);
                          setPassword3(e.target.value);
                          setConfirmationErr(false);
                          
                        }}
                      ></input>
                    </div>
                    {(passwordReqErr) ? (
                <div className='error-msg'>
                  <i className='fa fa-times-circle'></i>
                  Users shall set a password that is longer than 8 characters and contains at least one upper-case letter, one lower-case letter, and one number.
                </div>
              ) : null}
                    {(confirmationErr) ? (
                <div className='error-msg'>
                  <i className='fa fa-times-circle'></i>
                  Password and Confirm Password must be matched
                </div>
              ) : null}
                    <button
                      className='sign-up-button'
                      onClick={handleRegularSubmit}
                    >
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
                              type={inputField.type}
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
                     
                    <button
                      className='sign-up-button'
                      onClick={handleDoctorSubmit}
                    >
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
