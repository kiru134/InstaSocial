import React from "react";
const LogoutButton = (props) => {
  let loggedout = false;
  const logOutHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authTokenType");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    loggedout = true;
    props.validate(loggedout);
  };

  return (
    <React.Fragment>
      <div>
        <button onClick={logOutHandler}> LOGOUT </button>
      </div>
    </React.Fragment>
  );
};

export default LogoutButton;
