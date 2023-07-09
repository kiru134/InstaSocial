import React, { useState, useEffect } from "react";
import { Button, Modal, Typography, makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import cssclasses from "./Homepage.module.css";
import useHttp from "../Hooks/usehttphook";
import PostCard from "../Components/postCard";
// import Snackbar from "@material-ui/core/Snackbar";
import { Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../Components/Logout";
import Navbar from "../Components/Navbar";
import Timeline from "../Components/Timeline";

const BASE_URL = "https://socialmedia-api-odx6.onrender.com/";
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    variant: "outlined",
    backgroundColor: theme.palette.background.paper,
    position: "absolute",
    width: 400,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Homepage = () => {
  const [isLoggedOut, setloggedOut] = useState(false);
  const classes = useStyles();
  const [modalStyle, setModalStyle] = useState(getModalStyle);
  const [authToken, setauthToken] = useState(null);
  const [authTokenType, setauthTokenType] = useState(null);
  const [username, setusername] = useState("");
  const [userID, setUserID] = useState("");
  const [displaySnackbar, setsnackbar] = useState(false);
  const [snackbardisplayed, setisdisplayed] = useState(false);
  const navigate = useNavigate();

  // const handleSnackbarClose = (event) => {
  //   setsnackbar(false);
  //   setisdisplayed(true);
  // };
  // useEffect(() => {
  //   if (error || isLoggedOut) {
  //     setsnackbar(true);
  //   }
  // }, [error, isLoggedOut]);

  // useEffect(() => {
  //   // Checking if user is not loggedIn
  //   if (snackbardisplayed) {
  //     navigate("/");
  //   }
  // }, [navigate, snackbardisplayed]);

  useEffect(() => {
    //     const loggedInUser = localStorage.getItem("userId");
    setauthToken(localStorage.getItem("authToken"));
    setauthTokenType(localStorage.getItem("authTokenType"));
    setusername(localStorage.getItem("username"));
    setUserID(localStorage.getItem("userId"));
  }, [authToken, authTokenType, username, userID]);

  const validatelogout = (setlogout) => {
    setloggedOut(setlogout);
  };

  console.log(isLoggedOut);
  // const logOutHandler = () => {
  //   localStorage.removeItem("authToken");
  //   localStorage.removeItem("authTokenType");
  //   localStorage.removeItem("username");
  //   localStorage.removeItem("userId");
  //   setloggedOut(true);
  // };

  return (
    <React.Fragment>
      {!authToken && (
        <div>
          <Modal open={true}>
            <div style={modalStyle} className={classes.paper}>
              {/* <center>
                <img
                  className={cssclasses.socialmediaImage}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/900px-Instagram_icon.png?20200512141346"
                  alt="SocialMedia"
                />
              </center> */}
              <Typography> Please login to Continue </Typography>
              <NavLink to="/">
                <Button>Login</Button>
              </NavLink>
            </div>
          </Modal>
        </div>
      )}
      {authToken && (
        <div className={cssclasses.homepage}>
          <div className={cssclasses.homepage__navWraper}>
            <Navbar></Navbar>
          </div>
          <div className={cssclasses.homepage__timeline}>
            <Timeline currentuser={username}></Timeline>
          </div>
        </div>
      )}
    </React.Fragment>
  );

  {
    /* <div className={cssclasses.modal}>
        {!authToken && (
          <div>
            <Modal open={true}>
              <div style={modalStyle} className={classes.paper}>
                <center>
                  <img
                    className={cssclasses.socialmediaImage}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/900px-Instagram_icon.png?20200512141346"
                    alt="SocialMedia"
                  />
                </center>
                <Typography> Please login to Continue </Typography>
                <NavLink to="/">
                  <Button>Login</Button>
                </NavLink>
              </div>
            </Modal>
          </div>
        )}
      </div>
      {/* <div className={headerclasses.app}>
        <div className={headerclasses.app_header}>
          <img
            className={headerclasses.app_headerImage}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/900px-Instagram_icon.png?20200512141346"
            alt="SocialMedia"
          /> */
  }
  {
    /* {authToken && (
        <div>
          {/* <LogoutButton validate={validatelogout}></LogoutButton> */
  }
  {
    /* <Navbarmock></Navbarmock> */
  }
  //   </div>
  // )}

  {
    /*           
          {authToken && (
            <div>
              <button onClick={logOutHandler}> LOGOUT </button>
            </div>
          )} */
  }
  {
    /* </div> */
  }
  // {authToken && (
  //   <div className="all_posts">
  //     {posts.map((post) => (
  //       <PostCard key={Math.random() * 100} post={post} />
  //     ))}
  //   </div>
  // )}
  // <div>
  //   <Snackbar
  //     open={displaySnackbar}
  //     onClose={handleSnackbarClose}
  //     autoHideDuration={1500}
  //     message={isLoggedOut ? "Logged out successfully" : error}
  //   />
  // </div>
  // </div>
};
export default Homepage;
