import LoginModal from "./Loginpage";
import React from "react";
import "./MainNavigation.css";
import { useNavigate } from "react-router-dom";

function MainNavigation() {
  const errorState = (err) => {
    const error = err;
    console.log(error);
  };
  const navigate = useNavigate();
  const naviagtehandler = () => {
    navigate("/signup");
  };

  return (
    <React.Fragment>
      <div className="authentication">
        <div className="auth__left">
          <img src="https://i.imgur.com/P3Vm1Kq.png" alt="left image"></img>
        </div>
        <div className="auth__right">
          <LoginModal err={errorState} />
          <div className="auth__more">
            <span>
              Dont have an account?
              <button onClick={naviagtehandler}>Sign up</button>
            </span>
          </div>
        </div>
      </div>

      {/* <snackBar> */}
    </React.Fragment>
  );
}

export default MainNavigation;
