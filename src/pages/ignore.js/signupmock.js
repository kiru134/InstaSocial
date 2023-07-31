import { Avatar, Box, Button } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import useHttp from "../../Hooks/usehttphook";
import "./signup.css";
import { Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import { storage } from "../../FirebaseProfilepicture/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Snackbarcomp from "../../Components/snackbar";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SignUpMock = () => {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();
  const userfullnameInputRef = useRef();
  const [usernameblur, setusernametouched] = useState(false);
  const [passwordblur, setpasswordtouched] = useState(false);
  const [emailblur, setEnteredemailtouched] = useState(false);
  const [fullnameblur, setfullnametouched] = useState(false);
  const { isLoading, error, sendRequest: fetchUser } = useHttp();
  const [displaySnackbar, setsnackbar] = useState(false);
  const [signedIn, setisSignedIn] = useState(false);
  const [uploadedAvatar, setUploadedAvatar] = useState(null);
  const [updatedpassword, setUpdated] = useState("");
  const [updatedemail, setUpdatedemail] = useState("");
  const [updatedusername, setUpdatedusername] = useState("");
  const [updatedfullname, setUpatedfullname] = useState("");
  const [passwordType, setpasswordtype] = useState("password");
  const navigate = useNavigate();
  let errormessage = "";
  let emailerrormessage = "";
  let usernameerrormsg = "";
  let userfullnameerrormsg = "";
  let formisValid = false;

  useEffect(() => {
    if (error || signedIn) {
      setsnackbar(true);
    }
  }, [error, signedIn]);

  const navigatelogin = () => {
    navigate("/");
  };

  const handleSnackbarClose = (event) => {
    setsnackbar(false);
  };
  const emailValidate = (emailentered) => {
    // if (emailentered.length < 0) {
    //   emailerrormessage = "Email must not be Empty";
    //   return false;
    // }
    if (emailblur) {
      if (emailentered === "") {
        emailerrormessage = "Email field required!";
        return false;
      }
      if (/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(emailentered)) {
        return true;
      } else {
        emailerrormessage = "Please Enter a Valid Email!";
        return false;
      }
    }
  };

  const passwordValidate = (passwordentered) => {
    if (passwordblur) {
      if (passwordentered.length < 8) {
        errormessage = "Password must contain at least 8 characters!";
        return false;
      }
      if (passwordentered.length > 10) {
        errormessage = "Password must be 10 characters long!";
        return false;
      }
      const num = /[0-9]/;
      if (!num.test(passwordentered)) {
        errormessage = "password must contain at least one number (0-9)!";
        return false;
      }
      const alp = /[a-z]/;
      if (!alp.test(passwordentered)) {
        errormessage =
          "password must contain at least one lowercase letter (a-z)!";

        return false;
      }
      const specialchar = /[@$!%*?&]/;
      if (!specialchar.test(passwordentered)) {
        errormessage = "password must contain at least one special character";

        return false;
      }
      const cap = /[A-Z]/;
      if (!cap.test(passwordentered)) {
        errormessage =
          "password must contain at least one uppercase letter (A-Z)!";

        return false;
      } else {
        if (passwordentered == "") {
          errormessage = "";
          return false;
        }
      }
      return true;
    }
  };

  const validateusername = (name) => {
    if (usernameblur && name === "") {
      usernameerrormsg = "Username must not be empty!";
      return false;
    } else {
      usernameerrormsg = "";
      return true;
    }
  };
  const validatefullname = (fullname) => {
    if (fullnameblur && fullname === "") {
      userfullnameerrormsg = "FullName must not be empty!";
      return false;
    } else {
      userfullnameerrormsg = "";
      return true;
    }
  };
  console.log(usernameblur);
  console.log(updatedusername);
  const enteredNameisValid = validateusername(updatedusername.trim());
  const enteredemailisvalid = emailValidate(updatedemail.trim());
  const enteredPasswordisValid = passwordValidate(updatedpassword);
  const enteredfullnameisValid = validatefullname(updatedfullname);

  console.log("passwordvalid" + enteredPasswordisValid);
  console.log("formvalidation" + formisValid);

  const addUserAvatar = (e) => {
    if (e.target.files[0]) {
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

  const signInvalidate = (data) => {
    if (data) {
      setisSignedIn(true);
    }
  };

  function signIn(event) {
    event.preventDefault();
    // setEnteredNameTouched(true);
    // setEnteredpasswordtouched(true);
    // setEnteredemailtouched(true);
    if (
      !enteredNameisValid &&
      !enteredPasswordisValid &&
      !enteredemailisvalid
    ) {
      setisSignedIn(false);
      return;
    } else {
      console.log(uploadedAvatar);
      const json_string = JSON.stringify({
        // profileimage: uploadedAvatar,
        // username: usernameInputRef.current.value,
        // email: emailInputRef.current.value,
        // password: passwordInputRef.current.value
        fullname: userfullnameInputRef.current.value,
        username: usernameInputRef.current.value,
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
        dp: uploadedAvatar,
        public: 0,

        // public: accountType,
        // dp: uploadedAvatar,
      });

      fetchUser(
        {
          url: BASE_URL + "users/add",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: json_string,
        },
        signInvalidate
      );
      console.log("Signed in successfully");

      setUpdated("");
      setUpdatedemail("");
      setUpdatedusername("");
      setEnteredemailtouched(false);
      setusernametouched(false);
      setpasswordtouched(false);
      setfullnametouched(false);
    }
  }
  const handlepasswordKeyDown = (event) => {
    setUpdated(passwordInputRef.current.value);
  };
  const handleemailKeyDown = (event) => {
    setUpdatedemail(emailInputRef.current.value);
  };

  const handleusernamekeydown = (event) => {
    setUpdatedusername(usernameInputRef.current.value);
  };

  const handleuserfullnamekeydown = () => {
    setUpatedfullname(userfullnameInputRef.current.value);
  };

  const togglepasswordhandle = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setpasswordtype("text");
    } else {
      setpasswordtype("password");
    }
  };

  console.log(updatedpassword);
  return (
    <React.Fragment>
      <>
        {isLoading && <Loading></Loading>}
        <div className="container">
          <div className="form-box">
            <div className="appnameinsignin">InstaSocial</div>

            <div className="profile_pic">
              <label className="_label" htmlFor="file">
                <span>
                  <CameraEnhanceIcon style={{ height: "18px" }} />
                </span>

                <span>
                  {uploadedAvatar !== null ? "Change Image" : "Add Image"}
                </span>
              </label>
              <input id="file" type="file" onChange={addUserAvatar} />
              <Avatar
                className="profileavatar"
                src={uploadedAvatar}
                //   src="https://cdn.pixabay.com/photo/2017/08/06/21/01/louvre-2596278_960_720.jpg"
              />
            </div>
            <span className="profilepictureheading">Profile Picture</span>
            <form id="form" method="post" onSubmit={signIn}>
              <div className="input-group">
                <div className="input-field">
                  <input
                    ref={userfullnameInputRef}
                    id="FullName"
                    type="text"
                    autoCapitalize="off"
                    autoCorrect="off"
                    maxLength="75"
                    onChange={handleuserfullnamekeydown}
                    onBlur={() => setfullnametouched(true)}
                    aria-labelledby="placeholder-userfullname"
                  />
                  <label
                    className="placeholder-text"
                    htmlFor="FullName"
                    id="placeholder-userfullname"
                  >
                    <div className="text">FullName</div>
                  </label>
                </div>
                {!enteredfullnameisValid && (
                  <p className="errortext">{userfullnameerrormsg}</p>
                )}

                <div className="input-field">
                  <input
                    ref={usernameInputRef}
                    id="Username"
                    type="text"
                    autoCapitalize="off"
                    autoCorrect="off"
                    maxLength="75"
                    onChange={handleusernamekeydown}
                    onBlur={() => setusernametouched(true)}
                    aria-labelledby="placeholder-username"
                  />
                  <label
                    className="placeholder-text"
                    htmlFor="Username"
                    id="placeholder-username"
                  >
                    <div className="text">Username</div>
                  </label>
                </div>
                {!enteredNameisValid && (
                  <p className="errortext">{usernameerrormsg}</p>
                )}

                <div className="input-field">
                  <input
                    ref={emailInputRef}
                    id="email"
                    type="email"
                    onChange={handleemailKeyDown}
                    onBlur={() => setEnteredemailtouched(true)}
                    aria-labelledby="placeholder-Email"
                    // onChange={emailInputChangeHandler}
                  />
                  <label
                    className="placeholder-text"
                    htmlFor="email"
                    id="placeholder-Email"
                  >
                    <div className="text">Email</div>
                  </label>
                </div>
                {!enteredemailisvalid && (
                  <p className="errortext">{emailerrormessage}</p>
                )}

                {/* <div className="input-field"> */}
                <div className="input-field">
                  <input
                    ref={passwordInputRef}
                    id="password"
                    type="password"
                    // value={password}
                    onChange={handlepasswordKeyDown}
                    onBlur={() => setpasswordtouched(true)}
                    aria-labelledby="placeholder-Password"
                    // onChange={passwordInputChangeHandler}
                  />
                  <label
                    className="placeholder-text"
                    htmlFor="password"
                    id="placeholder-Password"
                  >
                    <div className="text">Password</div>
                  </label>
                  {/* <button type="button" onClick={togglepasswordhandle}>
                    {passwordblur && updatedpassword != ""
                      ? passwordType === "password"
                        ? "Show"
                        : "Hide"
                      : ""}
                  </button> */}
                </div>
                {!enteredPasswordisValid && (
                  <p className="errortext">{errormessage}</p>
                )}
              </div>
              <div className="formButton">
                {/* if (
    enteredNameisValid &&
    enteredPasswordisValid &&
    enteredemailisvalid &&
    enteredfullnameisValid
  ) {
    formisValid = true;
  }*/}
                <button
                  type="submit"
                  disabled={
                    !(
                      enteredNameisValid &&
                      enteredPasswordisValid &&
                      enteredemailisvalid &&
                      enteredfullnameisValid
                    )
                  }
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className="login_option">
              <span>
                Already have an account?
                <button onClick={navigatelogin}>Log In</button>
              </span>
            </div>
          </div>
        </div>
        {signedIn && !isLoading && (
          <Snackbarcomp openmodal={true} message={"Signed In successfully"} />
        )}

        {error && !isLoading && (
          <Snackbarcomp openmodal={true} message={error} />
        )}
        {/* <Snackbar
          open={displaySnackbar}
          //   anchorOrigin={{
          //     vertical: "center",
          //     horizontal: "center",
          //   }}
          onClose={handleSnackbarClose}
          autoHideDuration={1500}
          message={signedIn ? "Signed In successfully" : error}
        /> */}
      </>
    </React.Fragment>
  );
};
export default SignUpMock;
