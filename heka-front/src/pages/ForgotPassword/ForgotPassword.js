import React, { Component } from 'react';
import { useState } from 'react';
import './ForgotPassword.css';
import validator from 'validator';
import { NavLink as Link, Navigate , useNavigate} from 'react-router-dom';
import { BackendApi } from '../../api';
import { FaUserCircle, FaKey, FaUserPlus } from 'react-icons/fa';
import { AiOutlineLogin } from 'react-icons/ai';
import { display } from '@mui/system';

const ForgotPasswordForm = () => {
    const navigate = useNavigate();                              // sonradan ekledim
  const [username, setUsername] = useState('');
  const [validationCode, setValidationCode] = useState('');
  const [err_message, setErrMessage] = useState();
 
  const [isForgotPassword, setIsForgotPassword] = useState(true);
  const [isEmailValidation, setIsEmailValidation] = useState(false);
 
  const [wrong_email_password, setWrong] = useState();
  
  

  const handleSubmit = async (e) => {
    console.log('saved to firestore , input: ' + username);
    e.preventDefault();
    //const response = await BackendApi.postLogin(username, password);
   /* if (response.status === 200) {
      setIsAuthenticated(true);
    } else if (response.status === 403) {
      setWrong(true);
      /* alert('Invalid username or password'); */
   // }

    if (validator.isEmail(username)) {
      //alert(username);
      setIsForgotPassword(false);
      setIsEmailValidation(true);
      //navigate('/', {replace: true});       // sonradan ekledim
    } else {
      setErrMessage(true);
    }
  };

  const handleEmailValidationSubmit = async (e) => {
    console.log('saved to firestore , input: ' + username);
    e.preventDefault();
    //const response = await BackendApi.postLogin(username, password);
   /* if (response.status === 200) {
      setIsAuthenticated(true);
    } else if (response.status === 403) {
      setWrong(true);
      /* alert('Invalid username or password'); */
   // }

   
      //alert(username);
      setIsForgotPassword(false);
      setIsEmailValidation(false);
      setIsNewPassword(true);
      //navigate('/', {replace: true});       // sonradan ekledim
    
  };

  

  return (
    <>
      {isForgotPassword ? (
        <div className='general-password-container'>
        <form className='general-form-component'>
          <div className='con'>
            <div className='head-form'>
              <h2>Reset your password</h2>
              <p>
                <ForgotPassoword />
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
              
              <button className='login-button' onClick={handleSubmit}  >
                Reset password
                
                <AiOutlineLogin aria-hidden='true' />
              </button>
              
            </div>
          </div>
        </form>
      </div>
      ) : null}

      { isEmailValidation ? (
         <div className='general-password-container'>
         <form className='general-form-component'>
           <div className='con'>
             <div className='head-form'>
               <h2>Email Verification</h2>
               <p>
                 <ValidationMsg />
               </p>
             </div>
             <div className='field-set'>
               <div className='input-component'>
               <span className='input-item'>
                   <FaKey />
                 </span>
                 <input
                   className='form-input'
                   type='text'
                   placeholder='Verification Code'
                   required
                   value={validationCode}
                   onChange={(e) => {
                     setValidationCode(e.target.value);
                     setErrMessage(false);
                     setWrong(false);
                   }}
                 />
               </div>
               {err_message ? (
                 <div className='error-msg'>
                   <i className='fa fa-times-circle'></i>
                   Please enter a correct code
                 </div>
               ) : null}

               {wrong_email_password && !err_message ? (
                 <div className='error-msg'>
                   <i className='fa fa-times-circle'></i>
                   Invalid username or password
                 </div>
               ) : null}
               
               <button className='login-button' onClick={handleEmailValidationSubmit}>
                 Verify
                 <AiOutlineLogin aria-hidden='true' />
               </button>
               
             </div>
           </div>
         </form>
       </div>
      ) : null}

      
    </>
  );
};

const ForgotPassoword = () => (
  <div id='Registered'>
    <label>Tell us the email address associated with your Heka account, and we’ll send you an email with a verification code to reset your password.</label>
    <br></br>
    
  </div>
);

const ValidationMsg = () => (
  <div id='Registered'>
    <label>We sent you an email with a verification code to reset your password. Enter verification code.</label>
    <br></br>
    
  </div>
);


export default ForgotPasswordForm;
