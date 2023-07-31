import "./forgotpassword.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

import useHttp from "../Hooks/usehttphook";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const PasswordReset = () => {
  const navigate = useNavigate();
  const [otpinputfielddisplay, setotpfield] = useState(false);
  const { isLoading, error, sendRequest: verifyUser } = useHttp();
  const { otpLoading, otperror, sendRequest: verifyOtp } = useHttp();
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const [resetbutton, setresetbutton] = useState(false);
  const [usernameerror, setusernameerror] = useState("");
  const [otperrormsg, setotperrormsg] = useState("");
  const usernameInputRef = useRef(null);
  const otpfieldRef = useRef(null);

  const handlenavigate = () => {
    navigate("/");
  };

  useEffect(() => {
    if (otpinputfielddisplay != false) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }

        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setSeconds(59);
            setMinutes(minutes - 1);
          }
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [seconds, otpinputfielddisplay]);

  const checkverification = (data) => {
    if (data.success === true) {
      setotpfield(true);
      setusernameerror("");
      console.log("otpsent");
    } else {
      console.log("inside else");
      setusernameerror("Username doesn't exists");
    }

    console.log("inside username verification");
  };

  const checkOTPverification = (data) => {
    if (data.success === true) {
      let username = usernameInputRef.current.value;
      console.log(username);
      navigate(`/account/${username}/resetpassword/`);
    } else {
      setotperrormsg("OTP doesnot match");
    }
  };
  // resend otp whenever timer expires and enable reset otp button
  console.log(resetbutton);

  const setresettimmer = (data) => {
    if (data.success === true) {
      setMinutes(1);
      setSeconds(30);
    } else {
      setusernameerror("Username doesn't exists");
    }
    console.log("insideresettimmmer");
  };
  const resendotp = async () => {
    let username = usernameInputRef.current.value;
    await verifyUser(
      {
        url:
          BASE_URL +
          `/users/generate-otp?username=${encodeURIComponent(username)}`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
      setresettimmer
    );
  };

  const verifyusernameandotp = async (e) => {
    e.preventDefault();
    let username = usernameInputRef.current.value;
    if (otpinputfielddisplay) {
      let otpvalue = otpfieldRef.current.value;
      if (
        (otpvalue.length > 1 && otpvalue.length < 6) ||
        (otpvalue.length > 1 && otpvalue.length > 6)
      ) {
        setotperrormsg("OTP must be 6 characters long");
      } else {
        await verifyOtp(
          {
            url:
              BASE_URL +
              `/users/verify-otp?username=${encodeURIComponent(
                username
              )}&otp=${encodeURIComponent(otpvalue)}`,
            method: "POST",
            headers: { "Content-Type": "application/json" },
          },
          checkOTPverification
        );
      }
    } else {
      await verifyUser(
        {
          url:
            BASE_URL +
            `/users/generate-otp?username=${encodeURIComponent(username)}`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
        checkverification
      );
    }
  };

  return (
    <>
      <div className="mainforgetpasswordcontainer">
        <div className="forgetpasswordmaincontainer">
          <div className="appname">InstaSocial</div>
          <div className="resetformconatiner">
            <h1 style={{ fontWeight: 700, fontSize: "16px" }}>
              Trouble with logging in?
            </h1>
            <p className="requestparagraph">
              Enter your Username and we'll send a OTP to your linked mail ID.
            </p>
            <form
              id="forgetpasswordform"
              method="post"
              onSubmit={verifyusernameandotp}
            >
              <div className="usernamecontainer">
                <input
                  ref={usernameInputRef}
                  type="text"
                  autoCapitalize="off"
                  autoCorrect="off"
                  maxLength="75"
                  //   value={username}
                  //   onChange={nameInputChangeHandler}
                  placeholder="Username"
                  className="usernamefield"
                />
                {usernameerror != "" && (
                  <p className="usernamerrormsg">{usernameerror}</p>
                )}
              </div>
              {otpinputfielddisplay && (
                <div className="otpfieldcontainer">
                  <input
                    type="number"
                    id="otpfield"
                    ref={otpfieldRef}
                    placeholder="OTP"
                    className="otpfield"
                    maxLength={6}
                  />
                  <div className="countdown-text">
                    {seconds > 0 || minutes > 0 ? (
                      <p classname="timmer">
                        Expires in: {minutes < 10 ? `0${minutes}` : minutes}:
                        {seconds < 10 ? `0${seconds}` : seconds}
                      </p>
                    ) : (
                      <p className="otptimmerexpiredmsg">
                        Didn't recieve code?
                      </p>
                    )}

                    <button
                      disabled={seconds > 0 || minutes > 0}
                      style={{
                        color:
                          seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
                        background: "none",
                        border: 0,
                      }}
                      onClick={resendotp}
                    >
                      Resend OTP
                    </button>
                  </div>
                  {otperrormsg != "" && (seconds > 0 || minutes > 0) && (
                    <p className="usernamerrormsg">{otperrormsg}</p>
                  )}
                </div>
              )}

              <button className="finalsubmit" type="submit">
                {otpinputfielddisplay === false ? "Send OTP" : "Verify OTP"}
              </button>
            </form>
            <div className="resetdivider">
              <div className="orcontainer3" />
              <div className="orcontainer">OR</div>
              <div className="orcontainer3" />
            </div>
            <Link to="/signup" className="creatnewaccountlink">
              Create New Account
            </Link>
          </div>
          <div className="backtologinbuttoncontainer">
            <button onClick={handlenavigate} className="backtologinbutton">
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
