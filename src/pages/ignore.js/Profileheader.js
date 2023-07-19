import { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Avatar, Button } from "@material-ui/core";
import { Height, Margin } from "@mui/icons-material";
import { useSelector } from "react-redux/es/hooks/useSelector";
import useHttp from "../../Hooks/usehttphook";
import SettingsIcon from "@mui/icons-material/Settings";
import "./Profileheadernew.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const BASE_URL = "https://ig-clone-api-production.up.railway.app/";
const ProfileHeader = ({
  profileUsername,
  photoscount,
  followerCount,
  followingCount,
  profileuserdp,
}) => {
  let user = useSelector((state) => state.data.user);
  const [activatefollow, setfollowbutton] = useState("");
  //  const [requestsent,setrequestrequestsent] = useState("")
  const { isLoading, error, sendRequest: fetchprofileUser } = useHttp();
  const { Loading, iserror, sendRequest: updatefollowingstatus } = useHttp();

  let profileuserdetails = {};

  const updatefollowing = (data) => {
    if (data.success == true && activatefollow == "Follow") {
      followerCount = followerCount - 1;
      setfollowbutton("Follow");
    } else {
      if (data.success == true && activatefollow == "Following") {
        followerCount = followerCount + 1;
        setfollowbutton("Following");
      }
    }
  };

  const handlefollowbuttonclick = async (event) => {
    let endpoint = "";
    let sendmethod = "";
    // if the button name is following then set the delete api call to remove the follower and name the button to follow,and set the follower count
    if (event.target.innerText === "Following") {
      endpoint =
        BASE_URL +
        `users/remove-follower?username=${encodeURIComponent(
          profileUsername
        )}&follower=${encodeURIComponent(user.userauth.username)}`;
      sendmethod = "DELETE";
    } else {
      if (profileuserdetails.user.public == true) {
        endpoint =
          BASE_URL +
          `users/add-follower?username=${encodeURIComponent(
            profileUsername
          )}&follower=${encodeURIComponent(user.userauth.username)}`;
        sendmethod = "POST";
      } else {
        setfollowbutton("Requested");
      }
    }

    // if the button name is follow and if the profile is public set the post api call to add the follower and name the button as following

    await updatefollowingstatus(
      {
        url:
          BASE_URL +
          `users/user?username=${encodeURIComponent(
            profileUsername
          )}&current_user=${encodeURIComponent(user.userauth.username)}`,
        method: sendmethod,
        headers: { "Content-Type": "application/json" },
      },
      updatefollowing
    );
  };

  const checkfollower = (data) => {
    console.log(data);
    if (data.success == false) {
      setfollowbutton("Follow");
    } else {
      setfollowbutton("Following");
    }
    profileuserdetails = data;
    console.log(profileuserdetails);
  };

  useEffect(() => {
    const awaituserprofile = async () => {
      if (user.userauth.username !== profileUsername) {
        await fetchprofileUser(
          {
            url:
              BASE_URL +
              `users/user?username=${encodeURIComponent(
                profileUsername
              )}&current_user=${encodeURIComponent(user.userauth.username)}`,
            headers: { "Content-Type": "application/json" },
          },
          checkfollower
        );
      }
    };
    awaituserprofile();
  }, []);
  console.log(profileuserdp);

  return (
    <>
      <div>
        <div className="maincongtainer">
          <div className="profilecontainer">
            <div className="profile">
              <div className="profile-image">
                {profileUsername ? (
                  <Avatar
                    className="profileimageavatar"
                    src={profileuserdp}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  ></Avatar>
                ) : (
                  // <img src={profileuserdp} />

                  <Skeleton circle height={150} width={150} count={1} />
                )}
              </div>

              <div className="profile-user-settings">
                <div className="profileheadingwrapper">
                  <p className="profile-user-name">{profileUsername}</p>
                  {profileUsername !== user.userauth.username && (
                    <button
                      className="user-followbtn"
                      onClick={handlefollowbuttonclick}
                      disabled={activatefollow == "Requested"}
                      // style={{ alignContent: "center" }}
                    >
                      {/* {activatefollow} */}
                      {"Requested"}
                    </button>
                  )}
                  {profileUsername == user.userauth.username && (
                    <>
                      <button className="profile-edit-btn">Edit Profile</button>
                      <button
                        className="profile-settings-btn"
                        aria-label="profile settings"
                      >
                        <SettingsIcon></SettingsIcon>
                        {/* <i className="fas fa-cog" aria-hidden="true"></i> */}
                      </button>
                    </>
                  )}
                </div>
                <div className="profile-stats">
                  {followerCount < 0 || followingCount < 0 ? (
                    <Skeleton count={1} width={677} height={24} />
                  ) : (
                    <>
                      <div>
                        <span className="profile-stat-count">
                          {photoscount}
                        </span>
                        {photoscount == 1 ? ` post` : ` posts`}
                      </div>
                      <div>
                        <span className="profile-stat-count">
                          {followerCount}
                        </span>
                        {followerCount === 1 ? ` follower` : ` followers`}
                      </div>
                      <div>
                        <span className="profile-stat-count">
                          {followingCount}
                        </span>
                        {followingCount === 1 ? ` following` : ` follower`}
                      </div>
                    </>
                  )}
                </div>
                <div className="profile-bio">
                  <p>
                    <span className="profile-real-name">{profileUsername}</span>{" "}
                    <div>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit
                      📷✈️🏕️
                    </div>
                  </p>
                </div>
              </div>
              {/* <!-- End of profile section --> */}
            </div>
            {/* <!-- End of container --> */}
          </div>

          {activatefollow !== "" &&
            {
              /* {profileuserdetails.user.public === false &&
        activatefollow == "Following" &&
        photoscount <= 0 && (
          <>
            <p>No Posts Yet</p>
          </>
        )}
      {profileuserdetails.user.public === false &&
        activatefollow == "Follow" && (
          <>
            <p>Private Account</p>
          </>
        )}
      {profileuserdetails.user.public === true && photoscount < 0 && (
        <>
          <p>No Posts Yet</p>
        </>
      )}
      {profileuserdetails.user.public === true && photoscount > 0 && (
        <>
          <div className="profilecontainer">
            <div className="gallery">
              <div className="gallery-item" tabindex="0">
                <img
                  src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
                  className="gallery-image"
                  alt=""
                />

                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes">
                      <span className="visually-hidden">Likes:</span>
                      <i className="fas fa-heart" aria-hidden="true"></i> 56
                    </li>
                    <li className="gallery-item-comments">
                      <span className="visually-hidden">Comments:</span>
                      <i className="fas fa-comment" aria-hidden="true"></i> 2
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="loader"></div>
          </div>
        </>
      )} */
            }}
          {activatefollow === "" && (
            <div className="gallerycontainer">
              <div className="gallery">
                <div className="gallery-item">
                  <img
                    src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
                    className="gallery-image"
                    alt=""
                  />
                  <div className="gallery-item-info">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        // alignContent: "",
                      }}
                    >
                      <div className="gallery-item-likes">
                        <FavoriteIcon style={{ marginRight: "5px" }} />
                        {/* <span className="visually-hidden">Likes:</span> */}
                        56
                      </div>
                      <div className="gallery-item-comments">
                        <ChatBubbleIcon style={{ marginRight: "5px" }} />2
                        {/* <span className="visually-hidden">Comments:</span>2 */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gallery-item">
                  <img
                    src="https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_640.jpg"
                    className="gallery-image"
                    alt=""
                  />
                  <div className="gallery-item-info">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div className="gallery-item-likes">
                        <span className="visually-hidden">Likes:</span>
                        56
                      </div>
                      <div className="gallery-item-comments">
                        <span className="visually-hidden">Comments:</span>2
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gallery-item">
                  <img
                    src="https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_640.jpg"
                    className="gallery-image"
                    alt=""
                  />
                  <div className="gallery-item-info">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div className="gallery-item-likes">
                        <span className="visually-hidden">Likes:</span>
                        56
                      </div>
                      <div className="gallery-item-comments">
                        <span className="visually-hidden">Comments:</span>2
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gallery-item">
                  <img
                    src="https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_640.jpg"
                    className="gallery-image"
                    alt=""
                  />
                  <div className="gallery-item-info">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div className="gallery-item-likes">
                        <span className="visually-hidden">Likes:</span>
                        56
                      </div>
                      <div className="gallery-item-comments">
                        <span className="visually-hidden">Comments:</span>2
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="loader"></div> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ProfileHeader;

{
  /* 
          <div className="gallery-item" tabindex="0">
            <img
              src="https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop"
              className="gallery-image"
              alt=""
            />

            <div className="gallery-item-info">
              <ul>
                <li className="gallery-item-likes">
                  <span className="visually-hidden">Likes:</span>
                  <i className="fas fa-heart" aria-hidden="true"></i> 89
                </li>
                <li className="gallery-item-comments">
                  <span className="visually-hidden">Comments:</span>
                  <i class="fas fa-comment" aria-hidden="true"></i> 5
                </li>
              </ul>
            </div>
          </div>

          <div className="gallery-item" tabindex="0">
            <img
              src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&h=500&fit=crop"
              className="gallery-image"
              alt=""
            />

            <div className="gallery-item-type">
              <span className="visually-hidden">Gallery</span>
              <i class="fas fa-clone" aria-hidden="true"></i>
            </div>

            <div className="gallery-item-info">
              <ul>
                <li className="gallery-item-likes">
                  <span className="visually-hidden">Likes:</span>
                  <i className="fas fa-heart" aria-hidden="true"></i> 42
                </li>
                <li className="gallery-item-comments">
                  <span className="visually-hidden">Comments:</span>
                  <i className="fas fa-comment" aria-hidden="true"></i> 1
                </li>
              </ul>
            </div>
          </div>

          <div className="gallery-item" tabindex="0">
            <img
              src="https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop"
              className="gallery-image"
              alt=""
            />

            <div className="gallery-item-type">
              <span className="visually-hidden">Video</span>
              <i className="fas fa-video" aria-hidden="true"></i>
            </div>

            <div className="gallery-item-info">
              <ul>
                <li className="gallery-item-likes">
                  <span className="visually-hidden">Likes:</span>
                  <i className="fas fa-heart" aria-hidden="true"></i> 38
                </li>
                <li className="gallery-item-comments">
                  <span className="visually-hidden">Comments:</span>
                  <i className="fas fa-comment" aria-hidden="true"></i> 0
                </li>
              </ul>
            </div>
          </div>

          <div className="gallery-item" tabindex="0">
            <img
              src="https://images.unsplash.com/photo-1498471731312-b6d2b8280c61?w=500&h=500&fit=crop"
              className="gallery-image"
              alt=""
            />

            <div className="gallery-item-type">
              <span className="visually-hidden">Gallery</span>
              <i className="fas fa-clone" aria-hidden="true"></i>
            </div>

            <div className="gallery-item-info">
              <ul>
                <li className="gallery-item-likes">
                  <span className="visually-hidden">Likes:</span>
                  <i className="fas fa-heart" aria-hidden="true"></i> 47
                </li>
                <li className="gallery-item-comments">
                  <span className="visually-hidden">Comments:</span>
                  <i className="fas fa-comment" aria-hidden="true"></i> 1
                </li>
              </ul>
            </div>
          </div>

          <div className="gallery-item" tabindex="0">
            <img
              src="https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=500&h=500&fit=crop"
              className="gallery-image"
              alt=""
            />

            <div className="gallery-item-info">
              <ul>
                <li className="gallery-item-likes">
                  <span className="visually-hidden">Likes:</span>
                  <i className="fas fa-heart" aria-hidden="true"></i> 94
                </li>
                <li className="gallery-item-comments">
                  <span className="visually-hidden">Comments:</span>
                  <i className="fas fa-comment" aria-hidden="true"></i> 3
                </li>
              </ul>
            </div>
          </div>

          <div className="gallery-item" tabindex="0">
            <img
              src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=500&h=500&fit=crop"
              className="gallery-image"
              alt=""
            />

            <div className="gallery-item-type">
              <span className="visually-hidden">Gallery</span>
              <i className="fas fa-clone" aria-hidden="true"></i>
            </div>

            <div className="gallery-item-info">
              <ul>
                <li className="gallery-item-likes">
                  <span className="visually-hidden">Likes:</span>
                  <i className="fas fa-heart" aria-hidden="true"></i> 52
                </li>
                <li className="gallery-item-comments">
                  <span className="visually-hidden">Comments:</span>
                  <i className="fas fa-comment" aria-hidden="true"></i> 4
                </li>
              </ul>
            </div>
          </div>

          <div className="gallery-item" tabindex="0">
            <img
              src="https://images.unsplash.com/photo-1515814472071-4d632dbc5d4a?w=500&h=500&fit=crop"
              className="gallery-image"
              alt=""
            />

            <div className="gallery-item-info">
              <ul>
                <li className="gallery-item-likes">
                  <span className="visually-hidden">Likes:</span>
                  <i className="fas fa-heart" aria-hidden="true"></i> 66
                </li>
                <li className="gallery-item-comments">
                  <span className="visually-hidden">Comments:</span>
                  <i className="fas fa-comment" aria-hidden="true"></i> 2
                </li>
              </ul>
            </div>
          </div>

          <div className="gallery-item" tabindex="0">
            <img
              src="https://images.unsplash.com/photo-1511407397940-d57f68e81203?w=500&h=500&fit=crop"
              className="gallery-image"
              alt=""
            />

            <div className="gallery-item-type">
              <span className="visually-hidden">Gallery</span>
              <i className="fas fa-clone" aria-hidden="true"></i>
            </div>

            <div className="gallery-item-info">
              <ul>
                <li className="gallery-item-likes">
                  <span className="visually-hidden">Likes:</span>
                  <i className="fas fa-heart" aria-hidden="true"></i> 45
                </li>
                <li className="gallery-item-comments">
                  <span className="visually-hidden">Comments:</span>
                  <i className="fas fa-comment" aria-hidden="true"></i> 0
                </li>
              </ul>
            </div>
          </div>

          <div className="gallery-item" tabindex="0">
            <img
              src="https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=500&h=500&fit=crop"
              className="gallery-image"
              alt=""
            />

            <div className="gallery-item-info">
              <ul>
                <li className="gallery-item-likes">
                  <span className="visually-hidden">Likes:</span>
                  <i className="fas fa-heart" aria-hidden="true"></i> 34
                </li>
                <li className="gallery-item-comments">
                  <span className="visually-hidden">Comments:</span>
                  <i className="fas fa-comment" aria-hidden="true"></i> 1
                </li>
              </ul>
            </div>
          </div>

          <div className="gallery-item" tabindex="0">
            <img
              src="https://images.unsplash.com/photo-1505058707965-09a4469a87e4?w=500&h=500&fit=crop"
              className="gallery-image"
              alt=""
            />

            <div className="gallery-item-info">
              <ul>
                <li className="gallery-item-likes">
                  <span className="visually-hidden">Likes:</span>
                  <i className="fas fa-heart" aria-hidden="true"></i> 41
                </li>
                <li className="gallery-item-comments">
                  <span className="visually-hidden">Comments:</span>
                  <i className="fas fa-comment" aria-hidden="true"></i> 0
                </li>
              </ul>
            </div>
          </div>

          <div className="gallery-item" tabindex="0">
            <img
              src="https://images.unsplash.com/photo-1423012373122-fff0a5d28cc9?w=500&h=500&fit=crop"
              className="gallery-image"
              alt=""
            />

            <div className="gallery-item-type">
              <span className="visually-hidden">Video</span>
              <i className="fas fa-video" aria-hidden="true"></i>
            </div>

            <div className="gallery-item-info">
              <ul>
                <li className="gallery-item-likes">
                  <span className="visually-hidden">Likes:</span>
                  <i className="fas fa-heart" aria-hidden="true"></i> 30
                </li>
                <li className="gallery-item-comments">
                  <span className="visually-hidden">Comments:</span>
                  <i className="fas fa-comment" aria-hidden="true"></i> 2
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <!-- End of gallery --> */
}
{
  /* 
        <div className="loader"></div>
      </div> */
}
{
  /* <!-- End of container --> */
}

/* // const [isFollowingProfile, setIsFollowingProfile] = useState(null);
  // const activeBtnFollow = user.userauth.username !== profileUsername;
  // console.log(profileUsername);
  // console.log(followerCount);
  // const handleToggleFollow = async () => { */

/* //   setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
  //   setFollowerCount({ */

/* //     followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
  //   });
  // await toggleFollow(
  //   isFollowingProfile,
  //   user.docId,
  //   profileDocId,
  //   profileUserId,
  //   user.userId
  // );
};

// useEffect(() => { */

/* //   const isLoggedInUserFollowingProfile = async () => { */

/* //     const isFollowing = await isUserFollowingProfile(
//       user.username,
//       profileUserId
//     );
//     setIsFollowingProfile(!!isFollowing);
//   };

//   if (user?.username && profileUserId) { */

/* //     isLoggedInUserFollowingProfile();
//   }
// }, [user?.username, profileUserId]);

// return (
//     <>
//       <div className="userprofilecontainer">
//         <div className="userprofilecontainer_container">
//           {profileUsername ? ( */

/* //             <Avatar */

/* //               sx={{ height: "40px", width: "40px" }}
//               alt={`${profileUsername} profile picture`}
//               src={profileuserdp}
//             />
//           ) : (
//             <Skeleton circle height={150} width={150} count={1} />
//           )}
//         </div>
//         <div className="userprofilestats">
//           <div className="userprofilestats_container">
//             <p className="profilename">{profileUsername}</p>
//             {activeBtnFollow && isFollowingProfile === null ? ( */

/* //               <Skeleton count={1} width={80} height={32} />
//             ) : (
//               activeBtnFollow && (
//                 <button */

/* //                   className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
//                   type="button"
//                   onClick={handleToggleFollow}
//                   onKeyDown={(event) => { */

/* //                     if (event.key === "Enter") { */

/* //                       handleToggleFollow();
//                     }
//                   }}
//                 >
//                   {isFollowingProfile ? "Unfollow" : "Follow"}
//                 </button>
//               )
//             )}
//           </div>
//           <div className="loadingstatefollowimngdisplay">
//             {followerCount < 0 || followingCount < 0 ? ( */

/* //               <Skeleton count={1} width={677} height={24} />
//             ) : (
//               <>
//                 <p className="profilestatscount">
//                   <span style={{ fontWeight: "700px" }}>{photoscount}</span>{" "}
//                   photos
//                 </p>
//                 <p className="profilestatscount">
//                   <span style={{ fontWeight: "700px" }}>{followerCount}</span>
//                   {followerCount === 1 ? `follower` : `followers`}
//                 </p>
//                 <p className="profilestatscount">
//                   <span style={{ fontWeight: "700px" }}>{followingCount}</span>{" "}
//                   following
//                 </p>
//               </>
//             )}
//           </div> */

/* <div className="container mt-4">
            <p className="font-medium">
              {!fullName ? <Skeleton count={1} height={24} /> : fullName}
            </p>
          </div> */

/* //     </div>
//   </div>
// </>
//   );
// }; */
