import Header from "../../Components/CommonHeader";
import UserProfilePhotos from "./profilephoto";
import Profileheader from "./Profileheader";
import "./Dummy.css";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import useHttp from "../../Hooks/usehttphook";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Navbar from "../../Components/Navbar";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const Dummy = () => {
  let user = useSelector((state) => state.data.user);
  const { isLoading, error, sendRequest: fetchUser } = useHttp();
  const [userprofile, setuserprofile] = useState({});
  const [usergallery, setusergallery] = useState({});

  let currentuser = useParams();

  //  call the http request for the currentuser to get the profile details,
  const populateuserprofile = (data) => {
    console.log(data.followings);
    console.log(data.posts.length);
    setuserprofile(data);
    setusergallery(data.posts);
    console.log(data);
  };

  console.log(userprofile);

  useEffect(() => {
    console.log("inside fetch profileuser details");
    const awaituserprofile = async () => {
      await fetchUser(
        {
          url: BASE_URL + `users/user/${currentuser.username}`,
          headers: { "Content-Type": "application/json" },
        },
        populateuserprofile
      );
    };
    awaituserprofile();
  }, [currentuser]);

  document.title = `${currentuser.username}`;

  // const updatefollowercount = (data) => {};
  const deletepostwithid = (id) => {
    if (id != null) {
      console.log(id);
      setusergallery(usergallery.filter((item) => item.id !== id));
    }
  };
  return (
    <>
      {/* <Header profiledp={userprofile.dp}></Header> */}
      <Navbar></Navbar>
      <div className="userprofile">
        {userprofile.username != null && (
          <Profileheader
            userprop={userprofile}
            profileUsername={userprofile.username}
            gallery={usergallery}
            followerCount={
              userprofile.followers != undefined
                ? userprofile.followers.length
                : 0
            }
            followingCount={
              userprofile.followings != undefined
                ? userprofile.followings.length
                : 0
            }
            profileuserdp={userprofile.dp}
            profileuseraccount={userprofile.public}
            removepost={deletepostwithid}
            // setFollowerCount={updatefollowercount}
            // profileUsername={profileuser}
            // photoscount={Photoscount}
            // followerCount={fc}
            // followingCount={flc}
            // profileuserdp={pdp}
            // setFollowerCount={updatefollowercount}
          ></Profileheader>
        )}
      </div>
    </>
  );
};

{
  /* //   <div className="profileheader_container">
    //     {profileuser && ( */
}

export default Dummy;
