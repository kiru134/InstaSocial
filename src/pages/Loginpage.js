import React, { useState, useEffect, useRef } from "react";
import useHttp from "../Hooks/usehttphook";
// import classes from "./loginModal.module.css";
import "./SignupPage.css";
// import Snackbar from "@material-ui/core/Snackbar";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import Loading from "../Components/Loading";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/UserSlice";
import backImg from "../MainPageImages/backImg.jpg";

const BASE_URL = "https://socialmedia-api-odx6.onrender.com/";

function LoginModal() {
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
  const [usercreds, setusercreds] = useState({});
  let user = useSelector((state) => state.data.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  console.log(user);

  useEffect(() => {
    if (error || loogedIn) {
      setsnackbar(true);
    }
  }, [error, loogedIn]);

  const naviagtehandler = () => {
    navigate("/signup");
  };

  useEffect(() => {
    // Checking if user is not loggedIn
    if (loogedIn) {
      navigate("/Homepage");
      // checklogIn(true);
    }
    // } else {
    //   navigate("/");
    // }
  }, [navigate, loogedIn]);

  const handleSnackbarClose = (event) => {
    setsnackbar(false);
    setisdisplayed(true);
  };

  useEffect(() => {
    if (usercreds) {
      dispatch(
        loginUser({
          authToken: usercreds.access_token,
          authTokenType: usercreds.token_type,
          username: usercreds.username,
          userId: usercreds.user_id,
        })
        // authToken: null,
        // authTokenType: "",
        // username: "",
        // userId: "",
        // })
      );
      console.log("dispacthed action successfully");
    }
    console.log(usercreds);
  }, [usercreds]);

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
    console.log("userLoggedIn");
    setusercreds(data);
    // window.localStorage.setItem("authToken", data.access_token);
    // window.localStorage.setItem("authTokenType", data.token_type);
    // window.localStorage.setItem("username", data.username);
    // window.localStorage.setItem("userId", data.user_id);
    setisloggedin(true);
  };

  console.log(error);

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

  console.log("isloading: " + isLoading);
  return (
    <React.Fragment>
      <>
        {isLoading && <Loading></Loading>}
        <div className="register">
          <div className="col-1">
            <h2>Log In</h2>
            <span>To See Photos and Videos of your Friends</span>
            <form
              id="form"
              className="flex flex-col"
              method="post"
              onSubmit={login}
            >
              <div className="inputfields">
                <input
                  type="text"
                  placeholder="username"
                  ref={usernameInputRef}
                  autoCapitalize="off"
                  autoCorrect="off"
                  maxLength="75"
                  onBlur={nameInputBlurHandler}
                  onChange={nameInputChangeHandler}
                  value={username}
                />
                {/* {nameInputIsInvalid && (
            <p className="error-text">UserName must not be empty.</p>
          )} */}
              </div>
              <div className="inputfields">
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
                />
                <span class="showpassword">Show</span>
                {/* {passwordInputIsInvalid &&
                "Enter password of min-length-8 max-10 with alteast one UpperCase,one LowerCase,one specialcharacter"} */}
              </div>
              <button className="btn" disabled={!formisValid} type="submit">
                Log in
              </button>
              <div className="auth__more">
                <span>
                  Dont have an account?
                  <button onClick={naviagtehandler}>Sign up</button>
                </span>
              </div>
            </form>
          </div>
          <div className="col-start">
            <img src={backImg} alt="" />
          </div>
        </div>

        {/* <Snackbar
          open={displaySnackbar}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          onClose={handleSnackbarClose}
          autoHideDuration={1500}
          message={signedIn ? "Signed In successfully" : error}
        /> */}
      </>

      {/* <div className={classes.login}>
        {isLoading && <Loading></Loading>} */}
      {/* <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/900px-Instagram_icon.png?20200512141346"
        alt="SocialMedia"
      ></img> */}
      {/* <form
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
          </div> */}
      {/* <button disabled={!formisValid} type="submit">
          Log in
        </button> */}
      {/* </form>
      </div>
      <Snackbar
        open={displaySnackbar}
        onClose={handleSnackbarClose}
        autoHideDuration={1500}
        message={loogedIn ? "Logged In successfully" : error}
      /> */}
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
