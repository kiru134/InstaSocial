import { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { Skeleton } from "react-loading-skeleton";
import { Avatar, Button } from "@material-ui/core";
import { Height, Margin } from "@mui/icons-material";

const ProfileHeader = ({
  currentuser,
  photoscount,
  followerCount,
  followingCount,
}) => {
  //   const [isFollowing, setisFollowing] = useState("false");
  //   const [displayfollowbutton, setdisplayfollowbutton] = useState("false");
  //   useEffect(() => {
  if (currentuser != window.localStorage.getItem("username")) {
    // check in the follower list of the given user whether current user exists
    // accordingly set the isfollowing state
    //    let following user = profile.following.find(currentuser){
    //  if(followinguser){
    //     setisFollowing(true)
    //  }
    //       let followinguser = true;
    //       if (followinguser) {
    //         setisFollowing(true);
    //       }
    //     }
    //   }, []);

    const handletogglefollow = () => {
      // setisFollowing((isFollowing = !isFollowing));
      // dispatch
      // setfollowccount({
      //     followerCount:isFollowing? Number(profile.followers+1):Number(profile.followers-1)
      // })
      // if user is following then api call to update the follower
    };

    //   if (currentuser != window.localStorage.getItem("username")) {
    //     setdisplayfollowbutton(true);
    //   }

    return (
      <>
        <div className="profileheader_container_">
          <div className=".profileheader_container__">
            <div>
              <Avatar
                style={{
                  borderRadius: "9999px",
                  height: "10rem",
                  width: "10rem",
                  display: "flex",
                  //  border-radius: 9999px;
                  //  height: 10rem;
                  //  width: 10rem;
                  //  display: flex;
                }}
                // className="profileheader_container__avatar "
              >
                KN
                {/* "profile picture * ? scr=profile picture:""> */}
              </Avatar>
            </div>
          </div>
          <div className="profilestats">
            <div className="profilestats_">
              <p className="profilename">{"kiru"}</p>
              <button
                className="followbutton"
                type="button"
                onClick={handletogglefollow}
              >
                {/* {isFollowing ? "Unfollow" : "Follow"} */}
                Follow
              </button>
            </div>
            <div className="profileinteractioninfo">
              <p></p>
              {/* <Skeleton count={1} width={677} height={24} /> */}
              <>
                <p>
                  <span style={{ fontWeight: 700, padding: "3px" }}>
                    {photoscount}
                  </span>
                  {photoscount <= 0 ? "photo" : "photos"}
                </p>
                <p>
                  <span style={{ fontWeight: 700, padding: "3px" }}>
                    {followerCount}
                  </span>
                  {followerCount === 1 ? "follower" : "followers"}
                </p>
                <p>
                  <span style={{ fontWeight: 700, padding: "3px" }}>
                    {followingCount}
                  </span>
                  following
                </p>
              </>
            </div>
            <div style={{ display: "flex", flex: 0.7, marginTop: "2px" }}>
              <p style={{ fontWeight: 500 }}>Hey Stranger</p>
            </div>
          </div>
          {/* <div style={{ display: "flex", flex: 0.7, marginTop: "1rem" }}>
          <p style={{ fontWeight: 500 }}>Hey Stranger</p> */}
          {/* className="container mt-4" */}
          {/* <p className="font-medium">
                {!profile.fullName ? (
                  <Skeleton count={1} height={24} />
                ) : (
                  profile.fullName
                )}
              </p> */}
          {/* <p>
          {fir profile description}
      </p> */}
        </div>
      </>
    );
  }
};

export default ProfileHeader;
