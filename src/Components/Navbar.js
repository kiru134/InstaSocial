import React, { useState, useEffect } from "react";
import classes from "./navbar.module.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import Snackbar from "@material-ui/core/Snackbar";
import { Button, Modal, Typography, makeStyles } from "@material-ui/core";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [logoutClicked, setloggedOutclicked] = useState(false);
  // const [snackbardisplay, setdisplaysnackbar] = useState(false);

  // const navigate = useNavigate();

  // const handleSnackbarClose = (event) => {
  //   if (isLoggedOut) {
  //     setisdisplayed(true);
  //   }
  // };

  // const actiontodisplaymodal = () => {
  //   setmodaldisplay(true);
  // };

  // useEffect(() => {
  //   setloggedOutclicked(false);
  // }, []);

  // const calllogoutcomponent = () => {
  //   setloggedOutclicked(!logoutClicked);
  //   console.log("called logout component inisde navbar");
  //   console.log("checkbuttonclick =" + logoutClicked);
  // };

  // const setlogoutclick = (modalclosed) => {
  //   setlogoutclick(modalclosed);
  // };
  // useEffect(() => {
  //   if (logoutClicked) {
  //     setmodaldisplay(false);
  //   }
  // }, [logoutClicked]);

  // const logoutclickcheck = () => {
  //   setloggedOutclicked(true)
  //   // window.localStorage.removeItem("authToken");
  //   // setloggedOut(true);
  // };

  // useEffect(() => {
  //   if (isLoggedOut) {
  //     setdisplaysnackbar(true);
  //   }
  // });
  // useEffect(() => {
  //   // Checking if user is not loggedIn
  //   if (snackbardisplayed) {
  //     navigate("/");
  //   }
  // }, [navigate, snackbardisplayed]);

  // useEffect(() => {
  //   setauthToken(window.localStorage.getItem("authToken"));
  // });

  // await cometChat.logout();
  // localStorage.removeItem('auth');
  // setUser(null);
  // history.push('/login');

  return (
    <React.Fragment>
      <div className={classes.sidenav}>
        <img></img>
        <div className={classes.sidenav_buttons}>
          <button className={classes.sidenav_button}>
            <HomeIcon></HomeIcon>
            <span>Home</span>
          </button>
          <button className={classes.sidenav_button}>
            <SearchIcon></SearchIcon>
            <span>Search</span>
          </button>
          <button className={classes.sidenav_button}>
            <ExploreIcon></ExploreIcon>
            <span>Explore</span>
          </button>
          <button className={classes.sidenav_button}>
            <SlideshowIcon></SlideshowIcon>
            <span>Reels</span>
          </button>
          <button className={classes.sidenav_button}>
            <ChatIcon></ChatIcon>
            <span>Messages</span>
          </button>
          <button className={classes.sidenav_button}>
            <FavoriteBorderIcon></FavoriteBorderIcon>
            <span>Notifications</span>
          </button>
          <button className={classes.sidenav_button}>
            <AddCircleOutlineIcon></AddCircleOutlineIcon>
            <span>Create</span>
          </button>
          <button
            className={classes.sidenav_button}
            onClick={() => setloggedOutclicked(!logoutClicked)}
          >
            <LogoutIcon></LogoutIcon>
            <span>Logout</span>
          </button>
          {/* {logoutClicked && } */}
        </div>
      </div>
      <Logout
        modal={logoutClicked}
        modalclosed={() => setloggedOutclicked(!logoutClicked)}
      ></Logout>
      {/* <Snackbar
        open={open}
        // onClose={!snackbardisplay}
        autoHideDuration={1500}
        message={"logged Out Successfully!"}
      /> */}
    </React.Fragment>
  );
};

export default Navbar;

// import React, { useState, useEffect } from "react";
// import "./navbar.css";
// import { ReactComponent as BellIcon } from "../icons/bell.svg";
// import { ReactComponent as MessengerIcon } from "../icons/messenger.svg";
// import { ReactComponent as CaretIcon } from "../icons/caret.svg";
// import { ReactComponent as PlusIcon } from "../icons/plus.svg";
// import NavItem from "./NavItem";
// // import { ReactComponent as CogIcon } from "../icons/cog.svg";
// // import { ReactComponent as ChevronIcon } from "../icons/chevron.svg";
// // import { ReactComponent as ArrowIcon } from "../icons/arrow.svg";
// // import { ReactComponent as BoltIcon } from "../icons/bolt.svg";
// const Navbar = () => {
//   const [stickyClass, setStickyClass] = useState("navbar");

//   useEffect(() => {
//     window.addEventListener("scroll", stickNavbar);
//     return () => window.removeEventListener("scroll", stickNavbar);
//   }, []);

//   const stickNavbar = () => {
//     if (window !== undefined) {
//       let windowHeight = window.scrollY;
//       windowHeight > 150 ? setStickyClass("sticky-nav") : setStickyClass("");
//     }
//   };

//   return (
//     <React.Fragment>
//       <nav className={!stickyClass ? "navbar" : stickyClass}>
//         <ul className="navbar_nav">
//           {/* <NavItem icon={<PlusIcon />} />
//           <NavItem icon={<BellIcon />} /> */}
//           <NavItem icon={<MessengerIcon />} />
//           <NavItem icon={<CaretIcon />}>
//             <DropdownMenu></DropdownMenu>
//           </NavItem>
//           {/* <DropdownMenu></DropdownMenu> */}
//         </ul>
//       </nav>
//     </React.Fragment>
//   );
// };

// export default Navbar;
