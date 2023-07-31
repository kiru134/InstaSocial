import "./forgotpassword.css";
import { useState, useRef, useEffect } from "react";
import useHttp from "../Hooks/usehttphook";
import { useParams } from "react-router-dom";
import Snackbarcomp from "../Components/snackbar";
import { Link } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Forgetpassword = () => {
  const [password, setpassword] = useState("");
  const [confpassword, setconfirmpassword] = useState("");
  const [passwordType, setpasswordtype] = useState("password");
  const [matcherror, setmatcherror] = useState("");
  const [passwordblur, setpasswordtouched] = useState(false);
  const { isLoading, error, sendRequest: Updatepassword } = useHttp();
  const [updated, setudpated] = useState(false);
  let { username } = useParams();
  const passwordInputRef = useRef();
  const confpasswordInputRef = useRef();

  let errormessage = "";
  const passwordInputChangeHandler = (event) => {
    setpassword(event.target.value);
  };

  const confirmpasswordInputChangeHandler = (event) => {
    setconfirmpassword(event.target.value);
  };

  const togglepasswordhandle = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setpasswordtype("text");
    } else {
      setpasswordtype("password");
    }
  };

  const updateuservalidate = (data) => {
    if (data.username != "") {
      setudpated(true);
    }
    console.log(updated);
  };

  const handleformsubmit = (e) => {
    e.preventDefault();
    if (passwordInputRef.current.value !== confpasswordInputRef.current.value) {
      setmatcherror("Entered Password doesn't match");
      return;
    } else {
      const json_string = JSON.stringify({
        username: username,
        password: confpasswordInputRef.current.value,
      });
      Updatepassword(
        {
          url: BASE_URL + "users/update",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: json_string,
        },
        updateuservalidate
      );
      setpassword("");
      setconfirmpassword("");
      setpasswordtouched(false);
      setmatcherror("");
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
      setpasswordtouched(false);
      return true;
    }
  };
  const enteredPasswordisValid = passwordValidate(password);

  return (
    <div className="mainresetforgetpasswordcontainer">
      <div className="forgetpasswordresetmaincontainer">
        <div style={{ marginBottom: "30px" }} className="appname">
          InstaSocial
        </div>
        <h1 style={{ marginBottom: "20px" }}>Reset Password</h1>
        <form className="resetpasswordform" onSubmit={handleformsubmit}>
          <div className="newpasswordfield">
            <div className="newpasswordfiledname">
              <span>New&nbsp;Password</span>
            </div>

            <div className="passwordoverlaptext">
              <input
                ref={passwordInputRef}
                id="password"
                type={passwordType}
                value={password}
                placeholder="Password"
                onBlur={() => setpasswordtouched(true)}
                onChange={passwordInputChangeHandler}
                className="resetpasswordinput"
              />
              <button type="button" onClick={togglepasswordhandle}>
                {password != ""
                  ? passwordType === "password"
                    ? "Show"
                    : "Hide"
                  : ""}
              </button>
              {!enteredPasswordisValid && passwordblur && (
                <p className="resetpassworderrortext">{errormessage}</p>
              )}
            </div>
          </div>
          <div className="newpasswordfield">
            <div className="newpasswordfiledname">
              <span>Confirm&nbsp;Password</span>
            </div>

            <div className="passwordoverlaptext">
              <input
                ref={confpasswordInputRef}
                id="password2"
                type={passwordType}
                value={confpassword}
                placeholder="Confirm Password"
                onChange={confirmpasswordInputChangeHandler}
                className="resetpasswordinput"
              />
            </div>
          </div>
          {matcherror && <p>{matcherror}</p>}
          <button className="changepasswordbutton" type="submit">
            Change Password
          </button>
        </form>
        <div className="redirecttologin">
          <Link
            to="/"
            style={{ textDecoration: "none", color: "black", fontWeight: 700 }}
          >
            Back to login
          </Link>
        </div>
      </div>
      {updated && (
        <Snackbarcomp
          openmodal={true}
          message={"Password Changed Successfully"}
        />
      )}
      {error && <Snackbarcomp openmodal={true} message={error} />}
    </div>
  );
};

export default Forgetpassword;
