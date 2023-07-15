import React, { useState, useEffect, useRef } from "react";
import useHttp from "../Hooks/usehttphook";
// import classes from "./SignupPage.module.css";
import "./SignupPage.css";
// import Snackbar from "@material-ui/core/Snackbar";
import { Snackbar } from "@mui/material";
import { Avatar, Button } from "@material-ui/core";
import { storage } from "../FirebaseProfilepicture/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import frontImg from "../MainPageImages/frontImg.jpg";

const BASE_URL = "https://socialmedia-api-odx6.onrender.com/";
function SignupModal() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [passwordtouched, setEnteredpasswordtouched] = useState(false);
  const [emailtouched, setEnteredemailtouched] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);
  const [uploadedAvatar, setUploadedAvatar] = useState(null);
  // const [url, setUrl] = useState(null);
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const [accountType, setAccountType] = useState(0);
  // const privateAccountRef = useRef();
  // const publicAccountRef = useRef();
  const emailInputRef = useRef();
  const filepickerRef = useRef(null);
  const { isLoading, error, sendRequest: fetchUser } = useHttp();
  const [displaySnackbar, setsnackbar] = useState(false);
  const [signedIn, setisSignedIn] = useState(false);
  const navigate = useNavigate();

  let formisValid = false;
  useEffect(() => {
    if (error || signedIn) {
      setsnackbar(true);
    }
  }, [error, signedIn]);

  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
  };

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

  const naviagtehandler = () => {
    navigate("/");
  };

  const removeUserAvatar = () => {
    filepickerRef.current.value = null;
    setUserAvatar(null);
  };

  const addUserAvatar = (e) => {
    if (e.target.files[0]) {
      setUserAvatar(e.target.files[0]);
      addImagetofirebase(e.target.files[0]);
    }
  };

  const addImagetofirebase = (image) => {
    console.log(image);
    const imageRef = ref(storage, "image");
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUploadedAvatar(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
    console.log("uploadedAvatar=" + uploadedAvatar);
    // reader.readAsDataURL(e.target.files[0]);
    // reader.onload = (readerEvent) => {
    //   setUserAvatar(readerEvent.target.result);
    // };
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
        // profileimage: uploadedAvatar,
        // username: usernameInputRef.current.value,
        // email: emailInputRef.current.value,
        // password: passwordInputRef.current.value
        username: usernameInputRef.current.value,
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
        public: accountType,
        dp: uploadedAvatar,
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
    <React.Fragment>
      <>
        {isLoading && <Loading></Loading>}
        <div className="register">
          <div className="col-1">
            <h2>Sign In</h2>
            <span>Get Connected with friends</span>

            <form
              id="form"
              className="flex flex-col"
              method="post"
              onSubmit={signIn}
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
                {nameInputIsInvalid && <p>Name must not be empty.</p>}
              </div>
              <div className="inputfields">
                <input
                  type="email"
                  id="email"
                  ref={emailInputRef}
                  aria-label="Email"
                  placeholder="Email"
                  aria-required="true"
                  autoCapitalize="off"
                  autoCorrect="off"
                  value={email}
                  onBlur={emailInputBlurHandler}
                  onChange={emailInputChangeHandler}
                  name="email"
                />
                {/* {nameInputIsInvalid && <p>Name must not be empty.</p>} */}
              </div>
              <div className="inputfields">
                <input
                  placeholder="password"
                  ref={passwordInputRef}
                  autoCapitalize="off"
                  autoCorrect="off"
                  type="password"
                  value={password}
                  onBlur={passwordInputBlurHandler}
                  onChange={passwordInputChangeHandler}
                />
                {/* {passwordInputIsInvalid &&
                "Enter password of min-length-8 max-10 with alteast one UpperCase,one LowerCase,one specialcharacter"} */}
              </div>
              <button className="btn" disabled={!formisValid} type="submit">
                Sign In
              </button>
            </form>
          </div>
          <div className="col-2">
            <img src={frontImg} alt="" />
          </div>
        </div>
        <Snackbar
          open={displaySnackbar}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          onClose={handleSnackbarClose}
          autoHideDuration={1500}
          message={signedIn ? "Signed In successfully" : error}
        />
      </>
    </React.Fragment>
  );
}
export default SignupModal;

{
  /* <div className={classes.authentication}>
        {isLoading && <Loading></Loading>}
        <div className={classes.signup}>
          <form id="signinForm" method="post" onSubmit={signIn}>
            <h2>Sign up to see photos and videos from your friends.</h2>
            {userAvatar && (
              <div className={classes.signup__user_avatar}>
                <div>
                  <Avatar
                    sx={{
                      borderRadius: "0.5rem",
                      Height: "6rem",
                      marginBottom: "2rem",
                      width: "6rem",
                      objectFit: "contain",
                    }}
                    src={uploadedAvatar}
                    onClick={removeUserAvatar}
                  ></Avatar> */
}
{
  /* <img src={userAvatar} alt="user-avatar" />
              <svg onClick={removeUserAvatar} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg> */
}
{
  /* </div>
              </div>
            )}
            {!userAvatar && (
              <div
                onClick={() => filepickerRef.current.click()}
                className={classes.signup__avatar_picker}
              >
                Choose File
              </div>
            )}
            <input */
}
{
  /* style={{ display: "none" }}
              onChange={addUserAvatar}
              ref={filepickerRef}
              type="file"
              hidden
            />
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
              <p className="error-text">Name must not be empty.</p>
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
              <p>
                Enter a valid password of min length-8 max-length-10 with
                alteast one UpperCase,one LowerCase,one specialcharacter
                <br></br>
                and one numerical character
              </p>
            )}
            <input
              id="email"
              ref={emailInputRef}
              aria-label="Email"
              placeholder="Email"
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
            <p>Account Type</p>
            <input
              type="radio"
              value="Private"
              name="private"
              checked={accountType === "0"}
              onChange={handleAccountTypeChange}
            />
            <label for="private">Private</label>
            <input
              type="radio"
              value="Public"
              name="public"
              checked={accountType === "1"}
              onChange={handleAccountTypeChange}
            />
            <label for="private">Public</label>

            <div className={classes.formButton}>
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
          /> */
}
{
  /* </div>
        <div className={classes.auth__more}>
          <span>
            Already have an account?
            <button onClick={naviagtehandler}> Log In </button>
          </span>
        </div>
      </div> */
}

{
  /* {signedIn && (
        <div>
          <p>Please log in with the signed In credentials</p>
        </div>
      )} */
}
{
  /* </React.Fragment>
  );
} */
}

{
  /* export default SignupModal; */
}

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
//     onSubmit={signIn}
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
//         <p>
//           Enter a valid password of min length-8 max-length-10 with alteast
//           one UpperCase,one LowerCase,one specialcharacter<br></br>
//           and one numerical character
//         </p>
//       )}
//     </div>
//     <div className="inputemailfield">
//       <label htmlFor="email">
//         <span className="_aa4a">Email</span>
//       </label>
//       <input
//         id="email"
//         ref={emailInputRef}
//         aria-label="Email"
//         aria-required="true"
//         autoCapitalize="off"
//         autoCorrect="off"
//         type="email"
//         value={email}
//         onBlur={emailInputBlurHandler}
//         onChange={emailInputChangeHandler}
//         name="email"
//       />
//       {emailInputIsInvalid && <p>Enter a valid email</p>}
//     </div>

//     <div className="SignInButton">
//       <button
//         className="_acan _acap _acas _aj1-"
//         disabled={!formisValid}
//         type="submit"
//       >
//         Sign in
//       </button>
//     </div>
//   </form>
//   <Snackbar
//     open={displaySnackbar}
//     onClose={handleSnackbarClose}
//     autoHideDuration={1500}
//     message={signedIn ? "Signed In successfully" : error}
//   />
//   <div>
//     <p>Have and Account :</p>
//     <NavLink to="/">
//       <button> Log In </button>
//     </NavLink>
//   </div>

//   {signedIn && (
//     <div>
//       <p>Please log in with the signed In username and Password</p>
//     </div>
//   )}
// </div>
