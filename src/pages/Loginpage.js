import React, { useState, useEffect, useRef } from "react";
import useHttp from "../Hooks/usehttphook";
import classes from "./loginModal.module.css";
// import Snackbar from "@material-ui/core/Snackbar";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";

const BASE_URL = "https://socialmedia-api-odx6.onrender.com/";
function LoginModal(props) {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [passwordtouched, setEnteredpasswordtouched] = useState(false);
  const [loogedIn, setisloggedin] = useState(false);
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const { isLoading, error, sendRequest: fetchUser } = useHttp();
  const [displaySnackbar, setsnackbar] = useState(false);
  const [snackbardisplayed, setisdisplayed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (error || loogedIn) {
      setsnackbar(true);
    }
  }, [error, loogedIn]);

  useEffect(() => {
    // Checking if user is not loggedIn
    if (snackbardisplayed && loogedIn) {
      navigate("/Homepage");
    }
    // } else {
    //   navigate("/");
    // }
  }, [navigate, snackbardisplayed]);

  const handleSnackbarClose = (event) => {
    setsnackbar(false);
    setisdisplayed(true);
  };

  // const naviagtehandler = () => {
  //   navigate("/signup");
  // };
  let formisValid = false;
  // const passwordValidate = (passwordentered) => {
  //   if (passwordentered.length < 8 || passwordentered.length > 10) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };
  const usernameValidate = (usernameEntered) => {
    if (usernameEntered.length < 2) {
      return false;
    } else {
      return true;
    }
  };
  const enteredNameisValid = usernameValidate(username.trim());
  //   const enteredPasswordisValid = re.test(password);
  const enteredPasswordisValid = password.trim() !== "";
  const nameInputIsInvalid = !enteredNameisValid && enteredNameTouched;
  const passwordInputIsInvalid = !enteredPasswordisValid && passwordtouched;

  if (enteredNameisValid && enteredPasswordisValid) {
    formisValid = true;
  }

  console.log(`password is valid=${passwordInputIsInvalid}`);

  const nameInputChangeHandler = (event) => {
    setusername(event.target.value);
  };

  const passwordInputChangeHandler = (event) => {
    setpassword(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };
  const passwordInputBlurHandler = (event) => {
    setEnteredpasswordtouched(true);
  };

  const Authorization = (data) => {
    console.log(data.access_token);
    window.localStorage.setItem("authToken", data.access_token);
    window.localStorage.setItem("authTokenType", data.token_type);
    window.localStorage.setItem("username", data.username);
    window.localStorage.setItem("userId", data.user_id);
    setisloggedin(true);
  };

  console.log(error);
  props.err(error);

  async function login(event) {
    event.preventDefault();
    setEnteredNameTouched(true);
    setEnteredpasswordtouched(true);
    console.log(`username=${usernameInputRef.current.value}`);
    if (!enteredNameisValid && !enteredPasswordisValid) {
      setisloggedin(false);
      return;
    } else {
      let formData = new FormData();
      formData.append("username", usernameInputRef.current.value);
      formData.append("password", passwordInputRef.current.value);
      await fetchUser(
        {
          url: BASE_URL + "login",
          method: "POST",
          body: formData,
        },

        Authorization
      );

      setusername("");
      setpassword("");
      setEnteredNameTouched(false);
      setEnteredpasswordtouched(false);

      console.log(error);

      console.log("logged in successfully");
    }
  }

  return (
    <React.Fragment>
      <div className={classes.login}>
        {/* <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/900px-Instagram_icon.png?20200512141346"
        alt="SocialMedia"
      ></img> */}
        <form
          // className={classes.formclass}
          id="loginForm"
          method="post"
          onSubmit={login}
        >
          <input
            ref={usernameInputRef}
            id="username"
            aria-label="username"
            placeholder="username"
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
            <p className="error-text">UserName must not be empty.</p>
          )}
          <input
            id="password"
            ref={passwordInputRef}
            aria-label="Password"
            placeholder="password"
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
            <p>Password should be of min-length 8,max-length 10</p>
          )}
          <div className={classes.formButton}>
            <button disabled={!formisValid} type="submit">
              Log in
            </button>
          </div>
          {/* <button disabled={!formisValid} type="submit">
          Log in
        </button> */}
        </form>
      </div>

      <Snackbar
        open={displaySnackbar}
        onClose={handleSnackbarClose}
        autoHideDuration={1500}
        message={loogedIn ? "Logged In successfully" : error}
      />
    </React.Fragment>
    // <div className={classes.modal}>
    //   <center>
    //     <img
    //       className={classes.socialmediaImage}
    //       src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/900px-Instagram_icon.png?20200512141346"
    //       alt="SocialMedia"
    //     />
    //   </center>
    //   {/* <Form className="overallform" id="loginForm" onSubmit={submitHandler} method="post"> */}
    //   <form
    //     className={classes.formclass}
    //     id="loginForm"
    //     method="post"
    //     onSubmit={login}
    //   >
    //     <div className="inputusernamefield">
    //       <label htmlFor="username">username</label>
    //       <input
    //         ref={usernameInputRef}
    //         id="username"
    //         aria-label="username"
    //         aria-required="true"
    //         autoCapitalize="off"
    //         autoCorrect="off"
    //         maxLength="75"
    //         type="text"
    //         onBlur={nameInputBlurHandler}
    //         onChange={nameInputChangeHandler}
    //         value={username}
    //         name="username"
    //       />
    //       {nameInputIsInvalid && (
    //         <p className="error-text">Name must not be empty.</p>
    //       )}
    //     </div>
    //     <div className="inputpasswordfield">
    //       <label htmlFor="password">
    //         <span className="_aa4a">Password</span>
    //       </label>
    //       <input
    //         id="password"
    //         ref={passwordInputRef}
    //         aria-label="Password"
    //         aria-required="true"
    //         autoCapitalize="off"
    //         autoCorrect="off"
    //         type="password"
    //         value={password}
    //         onBlur={passwordInputBlurHandler}
    //         onChange={passwordInputChangeHandler}
    //         name="password"
    //       />
    //       {passwordInputIsInvalid && (
    //         <p>Password should be of min-length 8,max-length 10</p>
    //       )}
    //     </div>
    //     <div className="LoginButton">
    //       <button
    //         className="_acan _acap _acas _aj1-"
    //         disabled={!formisValid}
    //         type="submit"
    //       >
    //         Log in
    //       </button>
    //     </div>
    //   </form>
    //   <Snackbar
    //     open={displaySnackbar}
    //     onClose={handleSnackbarClose}
    //     autoHideDuration={1500}
    //     message={loogedIn ? "Logged In successfully" : error}
    //   />
    // <div>
    //   <p>New User :</p>
    //   <button onClick={naviagtehandler}> Sign Up </button>
    // </div>
    // </div>
  );
}

export default LoginModal;
