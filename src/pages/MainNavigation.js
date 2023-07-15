import React, { useState } from "react";
import "./MainNavigation.css";
import { useNavigate } from "react-router-dom";
import Homepage from "./Homepage";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { store } from "../appStore/Store";
import backImg from "../MainPageImages/backImg.jpg";
import frontImg from "../MainPageImages/frontImg.jpg";
import LoginMock from "../pages/ignore.js/loginmock";

function MainNavigation() {
  // const loggedInstate = (checklogIn) => {
  //   setisLoggedin(checklogIn);
  // };
  // const [isLoggedIn, setisLoggedin] = useState(false);
  const navigate = useNavigate();
  const naviagtehandler = () => {
    navigate("/signup");
  };
  let user = useSelector((state) => state.data.user);
  console.log(store.getState());
  // console.log("logged:" + isLoggedIn);
  // useEffect(() => {
  //   if (user.userauth.authToken === window.localStorage.getItem("authToken")) {
  //     auth = user.userauth.authToken;
  //   }
  // },[]);
  // console.log("authtokentype = " + user.userauth.authTokenType);
  return (
    <React.Fragment>
      <>
        {user.userauth.authToken != null && <Homepage></Homepage>}
        <div className="formcomponent">
          {/* {user.userauth.authToken == null && <LoginModal />} */}
          {user.userauth.authToken == null && <LoginMock />}
        </div>

        {/* {user.userauth.authToken != null && <Homepage></Homepage>}
        {user.userauth.authToken == null && (
          <div className="authentication">
            <div className="auth__left">
              <img src="https://i.imgur.com/P3Vm1Kq.png" alt="left image"></img>
            </div>
            <div className="auth__right">
              <LoginModal />
              <div className="auth__more">
                <span>
                  Dont have an account?
                  <button onClick={naviagtehandler}>Sign up</button>
                </span>
              </div>
            </div>
          </div>
        )} */}
        {/* <snackBar> */}
      </>
    </React.Fragment>
  );
}

export default MainNavigation;
