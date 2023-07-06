import LoginModal from "../Components/LoginModal";
import React from "react";
function Homepage() {
  const errorState = (err) => {
    const error = err;
    console.log(error);
  };

  return (
    <React.Fragment>
      <LoginModal err={errorState} />
      {/* <snackBar> */}
    </React.Fragment>
  );
}

export default Homepage;
