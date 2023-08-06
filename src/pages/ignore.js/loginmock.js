import React, { useState, useEffect, useRef } from "react";
import useHttp from "../../Hooks/usehttphook";
import "./signup.css";
import "./loginpage.css";
import { MetroSpinner } from "react-spinners-kit";
import Loading from "../../Components/Loading";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/UserSlice";
import Snackbarcomp from "../../Components/snackbar";
import Lottie from "react-lottie-player";
import loginpagejson from "../../assests/animations/auth-page-animation.json";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const LoginMock = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [loogedIn, setisloggedin] = useState(false);
  const { isLoading, error, sendRequest: fetchUser } = useHttp();
  const [usercreds, setusercreds] = useState({});
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const [passwordType, setpasswordtype] = useState("password");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const naviagtehandler = () => {
    navigate("/signup");
  };
  const togglepasswordhandle = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setpasswordtype("text");
    } else {
      setpasswordtype("password");
    }
  };
  // const navigatohomepage = () => {
  //   navigate("/Homepage", { replace: true });
  // };
  // useEffect(() => {
  //   // Checking if user is not loggedIn
  //   if (error || loogedIn) {
  //     setsnackbar(true);
  //     setsnackbardisplaystatus(true);
  //   }
  // }, [loogedIn, error]);

  // const handleSnackbarClose = (event) => {
  //   setsnackbar(false);
  //   // setsnackbardisplaystatus(true);
  //   console.log(snackbardisplayed);
  // };

  useEffect(() => {
    if (loogedIn) {
      navigate("/Homepage", { replace: true });
    }
  });
  //     // console.log("snackbarstatus" + snackbardisplayed);
  //     console.log("loggedInstatus" + loogedIn);
  //     console.log("inside snackbar status effect");
  //   }
  // }, [loogedIn]);

  useEffect(() => {
    if (usercreds) {
      dispatch(
        loginUser({
          authToken: usercreds.access_token,
          authTokenType: usercreds.token_type,
          username: usercreds.username,
          userId: usercreds.user_id,
          dp: usercreds.dp,
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

  let formisValid = false;
  const usernameValidate = (usernameEntered) => {
    if (usernameEntered.length < 2) {
      return false;
    } else {
      return true;
    }
  };
  const enteredNameisValid = usernameValidate(username.trim());
  const enteredPasswordisValid = password.trim() !== "";
  if (enteredNameisValid && enteredPasswordisValid) {
    formisValid = true;
  }
  const nameInputChangeHandler = (event) => {
    setusername(event.target.value);
  };

  const passwordInputChangeHandler = (event) => {
    setpassword(event.target.value);
  };

  const Authorization = (data) => {
    console.log(data.access_token);
    console.log("userLoggedIn");
    setusercreds(data);
    setisloggedin(true);
    // window.localStorage.setItem("authToken", data.access_token);
    // window.localStorage.setItem("authTokenType", data.token_type);
    // window.localStorage.setItem("username", data.username);
    // window.localStorage.setItem("userId", data.user_id);
  };
  async function login(event) {
    event.preventDefault();
    // console.log(`username=${usernameInputRef.current.value}`);
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

      console.log(error);

      console.log("logged in successfully");
    }
  }

  return (
    <React.Fragment>
      <>
        <div className="logincomponentconatiner">
          <div className="logincomponentsubconatiner">
            <div className="animationconatiner">
              <Lottie
                loop
                animationData={loginpagejson}
                play
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="loginfullcontainer">
              <div className="logincontainer">
                <form id="form" method="post" onSubmit={login}>
                  <div className="applicationname">InstaSocial</div>

                  <input
                    ref={usernameInputRef}
                    id="Username"
                    type="text"
                    autoCapitalize="off"
                    autoCorrect="off"
                    maxLength="75"
                    value={username}
                    onChange={nameInputChangeHandler}
                    placeholder="Username"
                    className="input1"
                  />
                  <div className="overlaptext">
                    <input
                      ref={passwordInputRef}
                      id="password"
                      type={passwordType}
                      value={password}
                      placeholder="Password"
                      onChange={passwordInputChangeHandler}
                      className="input2"
                    />
                    <button type="button" onClick={togglepasswordhandle}>
                      {password != ""
                        ? passwordType === "password"
                          ? "Show"
                          : "Hide"
                        : ""}
                    </button>
                  </div>

                  <button
                    className="loginsubmitbutton"
                    type="submit"
                    disabled={!formisValid}
                  >
                    {isLoading && (
                      <div className="loginspinner">
                        <MetroSpinner size={18} color="#FFFFFF" />
                      </div>
                    )}
                    {!isLoading && "Log In"}
                  </button>
                </form>
                <div className="divider">
                  <div className="orcontainer1" />
                  <div className="orcontainer">OR</div>
                  <div className="orcontainer2" />
                </div>
                <Link
                  to="/account/password/reset"
                  className="forgetpasswordlink"
                >
                  Forgotten your password?
                </Link>
              </div>
              <div className="bottomsignupcontainer">
                Don&apos;t have an account?
                <button onClick={naviagtehandler}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
        {loogedIn && (
          <Snackbarcomp openmodal={true} message={"Logged In successfully"} />
        )}
        {error && <Snackbarcomp openmodal={true} message={error} />}

        {/* {isLoading && <Loading></Loading>}
        <div className="container">
          <div className="form-box">
            <div className="profile_pic">
              <Avatar
                className="profileavatar"
                style={{ marginBottom: "5rem" }}
                src=""
                //   src="https://cdn.pixabay.com/photo/2017/08/06/21/01/louvre-2596278_960_720.jpg"
              />
            </div>
            <form id="form" method="post" onSubmit={login}>
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
                  Log In
                </button>
              </div>
            </form>
            <div className="login_option">
              <span>
                Don't have an account?
                <button onClick={naviagtehandler}>Sign In</button>
              </span>
            </div>
          </div>
        </div>
        <Snackbar
          open={displaySnackbar}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          sx={{ position: "absolute" }}
          onClose={handleSnackbarClose}
          autoHideDuration={1500}
          message={loogedIn ? "Logged In successfully" : error}
        />= */}
      </>
    </React.Fragment>
  );
};

export default LoginMock;
