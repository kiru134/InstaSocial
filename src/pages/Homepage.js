import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import cssclasses from "./Homepage.module.css";

import PostCard from "../Components/postCard";
// import Snackbar from "@material-ui/core/Snackbar";
import { Snackbar } from "@mui/material";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Navbar from "../Components/Navbar";
import Timeline from "../Components/Timeline";
import classes from "../Components/Timeline.module.css";
import { useNavigate, Link } from "react-router-dom";
import Suggestions from "../Components/Suggestion";

const BASE_URL = process.env.REACT_APP_BASE_URL;
// function getModalStyle() {
//   const top = 50;
//   const left = 50;

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     variant: "outlined",
//     backgroundColor: theme.palette.background.paper,
//     position: "absolute",
//     width: 400,
//     border: "2px solid #000",
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

const Homepage = () => {
  // const [snackbardisplayed, setisdisplayed] = useState(false);

  // const handleSnackbarClose = (event) => {
  //   setsnackbar(false);
  //   setisdisplayed(true);
  // };
  // useEffect(() => {
  //   if (error) {
  //     setsnackbar(true);
  //   }
  // }, [error]);

  // useEffect(() => {
  //   //     const loggedInUser = localStorage.getItem("userId");
  //   setauthToken(localStorage.getItem("authToken"));
  //   setauthTokenType(localStorage.getItem("authTokenType"));
  //   setusername(localStorage.getItem("username"));
  //   setUserID(localStorage.getItem("userId"));
  // }, [authToken, authTokenType, username, userID]);

  // const validatelogout = (setlogout) => {
  //   setloggedOut(setlogout);
  // };

  // const logOutHandler = () => {
  //   localStorage.removeItem("authToken");
  //   localStorage.removeItem("authTokenType");
  //   localStorage.removeItem("username");
  //   localStorage.removeItem("userId");
  //   setloggedOut(true);
  // };

  let user = useSelector((state) => state.data.user);
  console.log(user);
  console.log(user.userauth.username);
  console.log(user.userauth.dp);

  // const navigate = useNavigate();
  // const naviagtehandler = () => {
  //   // navigate("/profile");
  //   navigate(`/profile/${user.userauth.username}`);
  // };
  return (
    <React.Fragment>
      {/* { && (
        <div>
          <Modal open={true}>
            <div style={modalStyle} className={classes.paper}> */}
      {/* <center>
                <img
                  className={cssclasses.socialmediaImage}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/900px-Instagram_icon.png?20200512141346"
                  alt="SocialMedia"
                />
              </center> */}
      {/* <Typography> Please login to Continue </Typography>
              <NavLink to="/">
                <Button>Login</Button>
              </NavLink>
            </div>
          </Modal>
        </div> )}*/}
      <div className={cssclasses.homepage}>
        <Navbar></Navbar>
        {/* <div className={cssclasses.homepage__navWraper}> */}

        <div className={cssclasses.homepage__timeline}>
          <Timeline currentuser={user.userauth.username}></Timeline>
        </div>
        <div className={cssclasses.Homepage_right_side}>
          <div className={classes.userandsuggestions}>
            <div className={classes.userprofile}>
              <Link
                to={`/profile/${user.userauth.username}/`}
                style={{ marginRight: "7px" }}
              >
                <Avatar
                  alt={user.userauth.username}
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                  src={user.userauth.dp}
                ></Avatar>
              </Link>
              {/* </button> */}
              <h3 style={{ fontWeight: 600, fontSize: "14px" }}>
                {user.userauth.username}
              </h3>
            </div>

            {/* <UserProfile>
        </UserProfile> */}
            <Suggestions></Suggestions>
          </div>
        </div>
        <div>
          {/* <Snackbar
          open={displaySnackbar}
          // onClose={handleSnackbarClose}
          autoHideDuration={1500}
          message={ error?error:null}
        /> */}
        </div>
      </div>
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
    /* {authToken && (
        <div>
          {/* <LogoutButton validate={validatelogout}></LogoutButton> */
    /* <Navbarmock></Navbarmock> */
    //   </div>
    // )}
    /*           
          {authToken && (
            <div>
              <button onClick={logOutHandler}> LOGOUT </button>
            </div>
          )} */
    /* </div> */
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
  }
};
export default Homepage;
