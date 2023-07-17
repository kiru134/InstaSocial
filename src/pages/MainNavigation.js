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
  let user = useSelector((state) => state.data.user);
  console.log(store.getState());

  return (
    <React.Fragment>
      <>
        <LoginMock />
        {/* <div className="formcomponent"> */}

        {/* </div> */}
      </>
    </React.Fragment>
  );
}

export default MainNavigation;
