import React, { Component } from 'react';
import { useState } from 'react';
import './SignUpVerificationPage.css';
import validator from 'validator';
import { NavLink as Link, Navigate , useNavigate} from 'react-router-dom';
import { BackendApi } from '../../api';
import { FaUserCircle, FaKey, FaUserPlus } from 'react-icons/fa';
import { AiOutlineLogin } from 'react-icons/ai';
import { display } from '@mui/system';

const SignUpVerificationPage = (props) => {
    const navigate = useNavigate();                              // sonradan ekledim
  const [username, setUsername] = useState('');
  const [validationCode, setValidationCode] = useState('');
  const [err_message, setErrMessage] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerification, setIsVerification] = useState(true);

  const [validationCodeErr, setValidationCodeErr] = useState(false);
  const [Done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    console.log('saved to firestore , input: ' + username);
    e.preventDefault();
   // const response = await BackendApi.postEmail("test@gmail.com");  // I tested with forgot password backend for now. I will implement backend connection after API is provided.
   /* if (response.status === 200) {
      setIsAuthenticated(true);
    } else if (response.status === 403) {
      setWrong(true);
      /* alert('Invalid username or password'); */
   // }

    
      //alert(username);
    //  if(response.status === 200 ) {
        setIsVerification(false);
        setDone(true);
     // }
     // else if (response.status === 400) {
       // setValidationCodeErr(true);
     // }
      
      //navigate('/', {replace: true});       // sonradan ekledim
    
  };



  

 
  const handleSuccessSubmit = async (e) => {
    //console.log('saved to firestore , input: ' + username);
    e.preventDefault();
    //const response = await BackendApi.postLogin(username, password);
   /* if (response.status === 200) {
      setIsAuthenticated(true);
    } else if (response.status === 403) {
      setWrong(true);
      /* alert('Invalid username or password'); */
   // }

      //alert(username);
      navigate('/sign-in', {replace: true});
    
  };

  return (
    <>
      {isVerification ? (
        <div className='general-verification-container'>
        <form className='general-form-component'>
          <div className='con'>
            <div className='head-form'>
              <h2>Verify your account</h2>
              <p>
                <VerificationMessage />
               
              </p>
            </div>
            <div className='field-set'>
              <div className='input-component'>
                <span className='input-item-forgot'>
                  <FaUserCircle />
                </span>
                <input
                  className='form-input-forgot'
                  type='text'
                  placeholder='Verification Code'
                  required
                  value={validationCode}
                  onChange={(e) => {
                    setValidationCode(e.target.value);
                    setValidationCodeErr(false);
                  }}
                />
              </div>
              {(validationCodeErr) ? (
                <div className='error-msg'>
                  <i className='fa fa-times-circle'></i>
                  {" "} Incorrect validation code
                </div>
              ) : null}
              
              <button className='login-button' onClick={handleSubmit}  >
                Verify
                
                <AiOutlineLogin aria-hidden='true' />
              </button>
              
            </div>
          </div>
        </form>
      </div>
      ) : null}

     
      

      {Done ? (
        <div className='general-verification-container'>
        
          <div className='con'>
            <div className='head-form'>
              <h2>Completed</h2>
              <p>
                <SuccessMsg />
              </p>
            </div>
            

              
              
              <button className='login-button' onClick={handleSuccessSubmit}>
                Sign In
                <AiOutlineLogin aria-hidden='true' />
              </button>
              
            </div>
          </div>
       
      
      ) : null }
    </>
  );
};

const VerificationMessage = () => (
  <div id='Verificated'>
    <label> We sent you an email with a verification code to verify your email address .</label>
    <br></br>
    
  </div>
);


const SuccessMsg = () => (
  <div id='Verificated'>
    <label>You verified your email address successfully. Welcome to Heka.</label>
    <br></br>
    
  </div>
);

export default SignUpVerificationPage;