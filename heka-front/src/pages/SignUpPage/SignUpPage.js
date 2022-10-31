import React from "react";
import { useState } from "react";
import validator from "validator";
import { NavLink as Navigate } from "react-router-dom";
import { BackendApi } from "../../api";
import { FaUserCircle, FaKey, FaAddressBook } from "react-icons/fa";
import { AiFillDownCircle, AiOutlineLogin } from "react-icons/ai";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [err_message, setErrMessage] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [wrong_email_password, setWrong] = useState();
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password && email) {
      const response = await BackendApi.postRegister(email, username, password);
      console.log(response);
      if (response.status === 200) {
        setIsAuthenticated(true);
      } else if (response.status === 403) {
        setWrong(true);
        /* alert('Invalid username or password'); */
      }

      if (validator.isEmail(email)) {
        //alert(username);
      } else {
        setErrMessage(true);
      }
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" replace={true} />
      ) : (
        <div className="general-login-container">
          <form className="general-form-component">
            <div className="con">
              <div className="head-form">
                <h2>Sign Up</h2>
                <p>
                  <SignUpHead />
                </p>
              </div>
              <div className="field-set">
                <div className="input-component">
                  <span className="input-item">
                    <FaAddressBook />
                  </span>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrMessage(false);
                      setWrong(false);
                    }}
                  />
                </div>
                {err_message ? (
                  <div className="error-msg">
                    <i className="fa fa-times-circle"></i>
                    Please enter a valid email address
                  </div>
                ) : null}

                {wrong_email_password && !err_message ? (
                  <div className="error-msg">
                    <i className="fa fa-times-circle"></i>
                    Invalid email, username or password!
                  </div>
                ) : null}
                <div className="input-component">
                  <span className="input-item">
                    <FaUserCircle />
                  </span>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setErrMessage(false);
                      setWrong(false);
                    }}
                  />
                </div>
                <div className="input-component">
                  <span className="input-item">
                    <FaKey />
                  </span>

                  <input
                    className="form-input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setWrong(false);
                    }}
                  ></input>
                </div>
                <button className="login-button" onClick={handleSubmit}>
                  Sign Up
                  <AiOutlineLogin aria-hidden="true" />
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

const SignUpHead = () => (
  <div id="signUpHead">
    <label>You can register our application from below</label>
    <br></br>
    <br></br>
    <AiFillDownCircle aria-hidden="true" />
  </div>
);

export default SignUpPage;
