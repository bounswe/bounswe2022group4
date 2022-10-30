import React, { Component } from 'react';
import { useState } from 'react';
import './SignInPage.css';
import validator from 'validator';
import { NavLink as Link, Navigate } from 'react-router-dom';
import { BackendApi } from '../../api';

const LoginForm = () =>{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err_message, setErrMessage]= useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [wrong_email_password, setWrong]= useState();
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  

  const handleSubmit = async (e) => {
    console.log('saved to firestore , input: ' + username);
    e.preventDefault();
    const response = await BackendApi.postLogin(username, password);
    if (response.status === 200) {
      setIsAuthenticated(true);
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

 

  
    return(
      <>

{isAuthenticated ? (
        <Navigate to='/' replace={true} />
      ) : (
        <div class ="general-login-container">
        <div id="LoginForm">
          <h2 id="headerTitle">Login</h2>
          
          <div class = "con">
          <NotRegistered />
          <div class="field-set">
       
          <div class = "input-bar">
          <span class="input-item">
            <i class="fa fa-user-circle"></i>
          </span>
         
          <input class="form-input" id="txt-input" type="text" placeholder="@UserName" required  value={username}  onChange={(e) => {setUsername(e.target.value); setErrMessage(false); setWrong(false)}}>
      
          </input>
          </div>
          { err_message ? <div class="error-msg">
            <i class="fa fa-times-circle"></i>
            Please enter a valid email address
            
          </div>: null}

          { wrong_email_password && !err_message ? <div class="error-msg">
            <i class="fa fa-times-circle"></i>
            Invalid username or password
            
          </div>: null}
      <div class = "input-bar">
       <span class="input-item">
         <i class="fa fa-key"></i>
        </span>
       
       <input class="form-input" type="password" placeholder="Password" id="pwd"  name="password" required value={password}  onChange={(e) => {setPassword(e.target.value); setWrong(false)}}>
       </input>
       
  
      
      <span>
         <i class="fa fa-eye" aria-hidden="true"  type="button" id="eye"></i>
      </span>
      </div>
      
      </div>
  
       
    </div>
    
  
  
  
        
  
          
          <div id="button" class="FormRow">
            <button onClick={handleSubmit  }>Log in</button>
          </div>
  
          
  
          
          
          
        </div>
        </div>
      ) }


       
      
      </>
      
    );
  };



const NotRegistered = props => (
  <div id="Registered">
    <label>Not Registered yet?</label>
    <br></br>
    <div>
    <a class ="Link" href="/sign-up" > Sign Up </a>
    </div>
    
    
  </div>
);



export default LoginForm;