import { Avatar } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import useHttp from "../../Hooks/usehttphook";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/UserSlice";

const BASE_URL = "https://socialmedia-api-odx6.onrender.com/";

const LoginMock = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [loogedIn, setisloggedin] = useState(false);
  const { isLoading, error, sendRequest: fetchUser } = useHttp();
  const [usercreds, setusercreds] = useState({});
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  let user = useSelector((state) => state.data.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  console.log(user);

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
    // window.localStorage.setItem("authToken", data.access_token);
    // window.localStorage.setItem("authTokenType", data.token_type);
    // window.localStorage.setItem("username", data.username);
    // window.localStorage.setItem("userId", data.user_id);
    setisloggedin(true);
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
        {isLoading && <Loading></Loading>}
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

export default LoginMock;
