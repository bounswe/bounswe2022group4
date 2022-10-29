
import React, {Component} from 'react'
import {useState} from  'react'
import "./SignInPage.css"  
import validator from 'validator';
import { NavLink as Link } from 'react-router-dom';
const LoginForm = () =>{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err_message, setErrMessage]= useState();
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  

  const handleSubmit = (e) => {
    console.log("saved to firestore , input: " + username)
    e.preventDefault();
    if(validator.isEmail(username)){
      
      alert(username)
    }else{

      setErrMessage(true);
     
        
    }
};

 

  
    return(
      <div class ="general-login-container">
      <div id="LoginForm">
        <h2 id="headerTitle">Login</h2>
        <NotRegistered />
        <div class="FormRow">
          <label>E-mail</label>
          <input type="text" placeholder="Enter your e-mail" value={username}  onChange={(e) => {setUsername(e.target.value); setErrMessage(false)}}/>
        </div> 

        { err_message ? <div class="error-msg">
          <i class="fa fa-times-circle"></i>
          Please enter a valid email address
          
        </div>: null}

        

        <div class="FormRow">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" value={password}  onChange={(e) => setPassword(e.target.value)}/>
        </div> 

        
        <div id="button" class="FormRow">
          <button onClick={handleSubmit  }>Log in</button>
        </div>

        

        
        
        
      </div>
      </div>
    )
  }



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