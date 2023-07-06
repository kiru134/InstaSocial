import React, { useState, useEffect, useRef } from "react";
import useHttp from "../Hooks/usehttphook";
import classes from "./loginModal.module.css";
import Snackbar from "@material-ui/core/Snackbar";
// import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const BASE_URL = "https://socialmedia-api-odx6.onrender.com/";
function SignupModal() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [passwordtouched, setEnteredpasswordtouched] = useState(false);
  const [emailtouched, setEnteredemailtouched] = useState(false);
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();
  const { isLoading, error, sendRequest: fetchUser } = useHttp();
  const [displaySnackbar, setsnackbar] = useState(false);
  const [signedIn, setisSignedIn] = useState(false);

  let formisValid = false;
  useEffect(() => {
    if (error || signedIn) {
      setsnackbar(true);
    }
  }, [error, signedIn]);

  const handleSnackbarClose = (event) => {
    setsnackbar(false);
  };
  const emailValidate = (emailentered) => {
    if (emailentered) {
      if (/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(emailentered)) {
        return true;
      }
    }

    return false;
  };
  const passwordValidate = (passwordentered) => {
    if (passwordentered) {
      if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/.test(
          passwordentered
        )
      ) {
        return true;
      }
    }
    return false;
  };
  const enteredNameisValid = username.trim() !== "";
  const enteredPasswordisValid = passwordValidate(password.trim());
  const enteredemailisvalid = emailValidate(email.trim());
  const nameInputIsInvalid = !enteredNameisValid && enteredNameTouched;
  const passwordInputIsInvalid = !enteredPasswordisValid && passwordtouched;
  const emailInputIsInvalid = !enteredemailisvalid && emailtouched;

  if (enteredNameisValid && enteredPasswordisValid && enteredemailisvalid) {
    formisValid = true;
  }
  console.log(`password is valid=${passwordInputIsInvalid}`);
  const nameInputChangeHandler = (event) => {
    setusername(event.target.value);
  };

  const passwordInputChangeHandler = (event) => {
    setpassword(event.target.value);
  };

  const emailInputChangeHandler = (event) => {
    setemail(event.target.value);
  };
  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };
  const passwordInputBlurHandler = (event) => {
    setEnteredpasswordtouched(true);
  };

  const emailInputBlurHandler = (event) => {
    setEnteredemailtouched(true);
  };

  const signInvalidate = (data) => {
    if (data) {
      setisSignedIn(true);
    }
  };
  function signIn(event) {
    event.preventDefault();
    setEnteredNameTouched(true);
    setEnteredpasswordtouched(true);
    setEnteredemailtouched(true);
    if (
      !enteredNameisValid &&
      !enteredPasswordisValid &&
      !enteredemailisvalid
    ) {
      setisSignedIn(false);
      return;
    } else {
      const json_string = JSON.stringify({
        username: usernameInputRef.current.value,
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      });

      fetchUser(
        {
          url: BASE_URL + "users",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: json_string,
        },
        signInvalidate
      );
      console.log("Signed in successfully");

      setusername("");
      setpassword("");
      setemail("");
      setEnteredNameTouched(false);
      setEnteredpasswordtouched(false);
      setEnteredemailtouched(false);
    }
  }

  return (
    <div className={classes.modal}>
      <center>
        <img
          className={classes.socialmediaImage}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/900px-Instagram_icon.png?20200512141346"
          alt="SocialMedia"
        />
      </center>
      {/* <Form className="overallform" id="loginForm" onSubmit={submitHandler} method="post"> */}
      <form
        className={classes.formclass}
        id="loginForm"
        method="post"
        onSubmit={signIn}
      >
        <div className="inputusernamefield">
          <label htmlFor="username">username</label>
          <input
            ref={usernameInputRef}
            id="username"
            aria-label="username"
            aria-required="true"
            autoCapitalize="off"
            autoCorrect="off"
            maxLength="75"
            type="text"
            onBlur={nameInputBlurHandler}
            onChange={nameInputChangeHandler}
            value={username}
            name="username"
          />
          {nameInputIsInvalid && (
            <p className="error-text">Name must not be empty.</p>
          )}
        </div>
        <div className="inputpasswordfield">
          <label htmlFor="password">
            <span className="_aa4a">Password</span>
          </label>
          <input
            id="password"
            ref={passwordInputRef}
            aria-label="Password"
            aria-required="true"
            autoCapitalize="off"
            autoCorrect="off"
            type="password"
            value={password}
            onBlur={passwordInputBlurHandler}
            onChange={passwordInputChangeHandler}
            name="password"
          />
          {passwordInputIsInvalid && (
            <p>
              Enter a valid password of min length-8 max-length-10 with alteast
              one UpperCase,one LowerCase,one specialcharacter<br></br>
              and one numerical character
            </p>
          )}
        </div>
        <div className="inputemailfield">
          <label htmlFor="email">
            <span className="_aa4a">Email</span>
          </label>
          <input
            id="email"
            ref={emailInputRef}
            aria-label="Email"
            aria-required="true"
            autoCapitalize="off"
            autoCorrect="off"
            type="email"
            value={email}
            onBlur={emailInputBlurHandler}
            onChange={emailInputChangeHandler}
            name="email"
          />
          {emailInputIsInvalid && <p>Enter a valid email</p>}
        </div>

        <div className="SignInButton">
          <button
            className="_acan _acap _acas _aj1-"
            disabled={!formisValid}
            type="submit"
          >
            Sign in
          </button>
        </div>
      </form>
      <Snackbar
        open={displaySnackbar}
        onClose={handleSnackbarClose}
        autoHideDuration={1500}
        message={signedIn ? "Signed In successfully" : error}
      />
      <div>
        <p>Have and Account :</p>
        <NavLink to="/">
          <button> Log In </button>
        </NavLink>
      </div>

      {signedIn && (
        <div>
          <p>Please log in with the signed In username and Password</p>
        </div>
      )}
    </div>
  );
}

export default SignupModal;
