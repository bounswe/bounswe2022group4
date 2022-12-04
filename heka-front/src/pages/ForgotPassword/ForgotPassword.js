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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(true);
  const [isEmailValidation, setIsEmailValidation] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [wrong_email_password, setWrong] = useState();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [confirmationErr, setConfirmationErr] = useState();
  const [Done, setDone] = useState(false);

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

  const handleNewPasswordSubmit = async (e) => {
    console.log('saved to firestore , input: ' + username);
    e.preventDefault();
    //const response = await BackendApi.postLogin(username, password);
   /* if (response.status === 200) {
      setIsAuthenticated(true);
    } else if (response.status === 403) {
      setWrong(true);
      /* alert('Invalid username or password'); */
   // }

    if (password1 == password2) {
      //alert(username);
      setIsForgotPassword(false);
      setIsEmailValidation(false);
      setIsNewPassword(false);
      setDone(true);
    } else {
      setConfirmationErr(true);
    
    }
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
                <span className='input-item-forgot'>
                  <FaUserCircle />
                </span>
                <input
                  className='form-input-forgot'
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
               <span className='input-item-forgot'>
                   <FaKey />
                 </span>
                 <input
                   className='form-input-forgot'
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

      {isNewPassword ? (
        <div className='general-password-container'>
        <form className='general-form-component'>
          <div className='con'>
            <div className='head-form'>
              <h2>New Password</h2>
              <p>
                <NewPasswordMsg />
              </p>
            </div>
            <div className='field-set'>
              <div className='input-component'>
              <span className='input-item-forgot'>
                  <FaKey />
                </span>
                <input
                  className='form-input-forgot'
                  type='password'
                  placeholder='Password'
                  required
                  value={password1}
                  onChange={(e) => {
                    setPassword1(e.target.value);
                    setConfirmationErr(false);
                    setWrong(false);
                  }}
                />
              </div>

              <div className='input-component'>
              <span className='input-item-forgot'>
                  <FaKey />
                </span>
                <input
                  className='form-input-forgot'
                  type='password'
                  placeholder='Confirm Password'
                  required
                  value={password2}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                    setConfirmationErr(false);
                    setWrong(false);
                  }}
                />
              </div>

              {(confirmationErr) ? (
                <div className='error-msg'>
                  <i className='fa fa-times-circle'></i>
                  Password and Confirm Password must be matched
                </div>
              ) : null}

              
              
              <button className='login-button' onClick={handleNewPasswordSubmit}>
                Change Password
                <AiOutlineLogin aria-hidden='true' />
              </button>
              
            </div>
          </div>
        </form>
      </div>
      ) : null}

      {Done ? (
        <div className='general-password-container'>
        
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

const ForgotPassoword = () => (
  <div id='Registered'>
    <label>Tell us the email address associated with your Heka account, and we’ll send you an email with a verification code to reset your password.</label>
    <br></br>
    
  </div>
);
const NewPasswordMsg = () => (
  <div id='Registered'>
    <label>Now,You can determine new password. </label>
    <br></br>
    
  </div>
);
const ValidationMsg = () => (
  <div id='Registered'>
    <label>We sent you an email with a verification code to reset your password. Enter verification code.</label>
    <br></br>
    
  </div>
);
const SuccessMsg = () => (
  <div id='Registered'>
    <label>Your password is changed successfully. You can sign in.</label>
    <br></br>
    
  </div>
);

export default ForgotPasswordForm;
