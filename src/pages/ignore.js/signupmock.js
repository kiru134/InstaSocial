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
const BASE_URL = "https://ig-clone-api-production.up.railway.app/";

const SignUpMock = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();
  const { isLoading, error, sendRequest: fetchUser } = useHttp();
  const [displaySnackbar, setsnackbar] = useState(false);
  const [signedIn, setisSignedIn] = useState(false);
  const [uploadedAvatar, setUploadedAvatar] = useState(null);
  //   const [userAvatar, setUserAvatar] = useState(null);
  const navigate = useNavigate();

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
  //   const passwordlengthcheck = passwordInputRef.current.value < 8;
  const enteredPasswordisValid = passwordValidate(password.trim());
  const enteredemailisvalid = emailValidate(email.trim());
  if (enteredNameisValid && enteredPasswordisValid && enteredemailisvalid) {
    formisValid = true;
  }
  const nameInputChangeHandler = (event) => {
    setusername(event.target.value);
  };
  const emailInputChangeHandler = (event) => {
    setemail(event.target.value);
  };

  const passwordInputChangeHandler = (event) => {
    setpassword(event.target.value);
  };
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
      const json_string = JSON.stringify({
        // profileimage: uploadedAvatar,
        // username: usernameInputRef.current.value,
        // email: emailInputRef.current.value,
        // password: passwordInputRef.current.value
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

      setusername("");
      setpassword("");
      setemail("");
      //   setEnteredNameTouched(false);
      //   setEnteredpasswordtouched(false);
      //   setEnteredemailtouched(false);
    }
  }

  return (
    <React.Fragment>
      <>
        {isLoading && <Loading></Loading>}
        <div className="container">
          <div className="form-box">
            <div className="profile_pic">
              <label className="_label" htmlFor="file">
                <span>
                  <CameraEnhanceIcon style={{ height: "18px" }} />
                </span>

                <span>Change Image</span>
              </label>
              <input id="file" type="file" onChange={addUserAvatar} />
              <Avatar
                className="profileavatar"
                src={uploadedAvatar}
                //   src="https://cdn.pixabay.com/photo/2017/08/06/21/01/louvre-2596278_960_720.jpg"
              />
            </div>
            <form id="form" method="post" onSubmit={signIn}>
              <div className="input-group">
                <div className="input-field">
                  <input
                    ref={usernameInputRef}
                    id="Username"
                    type="text"
                    autoCapitalize="off"
                    autoCorrect="off"
                    maxLength="75"
                    value={username}
                    onChange={nameInputChangeHandler}
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

                <div className="input-field">
                  <input
                    ref={emailInputRef}
                    id="email"
                    type="email"
                    value={email}
                    aria-labelledby="placeholder-Email"
                    onChange={emailInputChangeHandler}
                  />
                  <label
                    className="placeholder-text"
                    htmlFor="email"
                    id="placeholder-Email"
                  >
                    <div className="text">Email</div>
                  </label>
                </div>

                <div className="input-field">
                  <input
                    ref={passwordInputRef}
                    id="password"
                    type="password"
                    value={password}
                    aria-labelledby="placeholder-Password"
                    onChange={passwordInputChangeHandler}
                  />
                  <label
                    className="placeholder-text"
                    htmlFor="password"
                    id="placeholder-Password"
                  >
                    <div className="text">Password</div>
                  </label>
                </div>
              </div>
              <div className="formButton">
                <button type="submit" disabled={!formisValid}>
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
        <Snackbar
          open={displaySnackbar}
          //   anchorOrigin={{
          //     vertical: "center",
          //     horizontal: "center",
          //   }}
          onClose={handleSnackbarClose}
          autoHideDuration={1500}
          message={signedIn ? "Signed In successfully" : error}
        />
      </>
    </React.Fragment>
  );
};
export default SignUpMock;
