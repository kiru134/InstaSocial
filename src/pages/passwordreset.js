import "./forgotpassword.css";
import { Link, useNavigate } from "react-router-dom";
const PasswordReset = () => {
  const navigate = useNavigate();
  const handlenavigate = () => {
    navigate("/");
  };

  return (
    <>
      <div className="mainforgetpasswordcontainer">
        <div className="forgetpasswordmaincontainer">
          <div className="appname">InstaSphere</div>
          <div className="resetformconatiner">
            <h1 style={{ fontWeight: 700, fontSize: "16px" }}>
              Trouble with logging in?
            </h1>
            <p className="requestparagraph">
              Enter your email address and we'll send you a link to get back
              into your account.
            </p>
            <form id="forgetpasswordform" method="post">
              <input
                //   ref={usernameInputRef}
                type="text"
                autoCapitalize="off"
                autoCorrect="off"
                maxLength="75"
                //   value={username}
                //   onChange={nameInputChangeHandler}
                placeholder="Email Address"
                className="emailfield"
              />
              <button>Send Login Link</button>
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
