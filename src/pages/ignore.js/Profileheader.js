import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Avatar, Button } from "@material-ui/core";
import { useSelector } from "react-redux/es/hooks/useSelector";
import useHttp from "../../Hooks/usehttphook";
import SettingsIcon from "@mui/icons-material/Settings";
import "./Profileheadernew.css";
import UserGallery from "./ProfileGallery";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ProfileHeader = ({
  userprop,
  profileUsername,
  gallery,
  followerCount,
  followingCount,
  profileuserdp,
  profileuseraccount,
  removepost,
}) => {
  let user = useSelector((state) => state.data.user);
  const [activatefollow, setfollowbutton] = useState("");
  const location = useLocation();
  //  const [requestsent,setrequestrequestsent] = useState("")
  const { isLoading, error, sendRequest: fetchprofileUser } = useHttp();
  const { Loading, iserror, sendRequest: updatefollowingstatus } = useHttp();
  const [fc, setfollowercount] = useState(followerCount);
  const navigate = useNavigate();

  console.log(profileuseraccount);

  const updatefollowing = (data) => {
    if (data.success == true && activatefollow == "Follow") {
      setfollowercount(fc + 1);
      setfollowbutton("Following");
    } else {
      if (data.success == true && activatefollow == "Following") {
        setfollowercount(fc - 1);
        setfollowbutton("Follow");
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
      if (profileuseraccount == true) {
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
        url: endpoint,
        // BASE_URL +
        // `users/user?username=${encodeURIComponent(
        //   profileUsername
        // )}&current_user=${encodeURIComponent(user.userauth.username)}`,
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

  const handleclick = () => {
    {
      navigate(`/profile/${profileUsername}/edit`);
    }
  };
  const removedeltedpost = (id) => {
    console.log(id);
    removepost(id);
    // if (id != null) {
    //   gallery = gallery.filter((item) => item.id !== id);
    //   photoscount = photoscount - 1;
    // }
  };

  const handlefollowersonclick = () => {
    navigate(`/profile/${profileUsername}/followers`);
  };
  return (
    <>
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
                {!profileuseraccount &&
                  profileUsername !== user.userauth.username && (
                    <Skeleton count={1} width={90} height={30}></Skeleton>
                  )}
                {profileUsername !== user.userauth.username && (
                  <button
                    className="user-followbtn"
                    onClick={handlefollowbuttonclick}
                    disabled={activatefollow == "Requested"}
                    // style={{ alignContent: "center" }}
                  >
                    {activatefollow}
                  </button>
                )}
                {profileUsername == user.userauth.username && (
                  <>
                    <button onClick={handleclick} className="profile-edit-btn">
                      Edit Profile
                    </button>
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
                        {gallery.length}
                      </span>
                      {gallery.length == 1 ? ` post` : ` posts`}
                    </div>
                    {fc > 0 &&
                      (activatefollow == "Following" ||
                        profileUsername == user.userauth.username) && (
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to={`/profile/${profileUsername}/followers`}
                          state={{ previousLocation: location }}
                        >
                          <span className="profile-stat-count">{fc}</span>
                          {fc === 1 ? ` follower` : ` followers`}
                        </Link>
                      )}
                    {fc <= 0 && (
                      <div>
                        <span className="profile-stat-count">{fc}</span>
                        {fc === 1 ? ` follower` : ` followers`}
                      </div>
                    )}

                    {fc > 0 &&
                      (activatefollow == "Follow" ||
                        activatefollow == "Requested") && (
                        <div>
                          <span className="profile-stat-count">{fc}</span>
                          {fc === 1 ? ` follower` : ` followers`}
                        </div>
                      )}

                    {followingCount > 0 &&
                      (activatefollow == "Following" ||
                        profileUsername == user.userauth.username) && (
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to={`/profile/${profileUsername}/following`}
                          state={{ previousLocation: location }}
                        >
                          <span className="profile-stat-count">
                            {" "}
                            {followingCount}
                          </span>
                          {" following"}
                        </Link>
                      )}
                    {followingCount <= 0 && (
                      <div>
                        <span className="profile-stat-count">
                          {followingCount}
                        </span>
                        {" following"}
                      </div>
                    )}

                    {followingCount > 0 &&
                      (activatefollow == "Follow" ||
                        activatefollow == "Requested") && (
                        <div>
                          <span className="profile-stat-count">
                            {followingCount}
                          </span>
                          {" following"}
                        </div>
                      )}
                  </>
                )}
              </div>
              <div className="profile-bio">
                <p>
                  <span className="profile-real-name">{userprop.fullname}</span>{" "}
                  <div>{userprop.bio}</div>
                </p>
              </div>
            </div>
            {/* <!-- End of profile section --> */}
          </div>
          {/* <!-- End of container --> */}
        </div>

        <div className="gallerycontainer">
          {gallery.length === undefined && (
            <Skeleton
              count={1}
              className="gallery"
              // display="grid"
              // grid-template-columns="repeat(3, minmax(250px, 33%))"
              // gridgap="4px"
            ></Skeleton>
          )}
          {user.userauth.username !== profileUsername &&
            profileuseraccount === true &&
            gallery.length <= 0 && (
              <div className="nopostsyet">
                <AddAPhotoOutlinedIcon
                  style={{ width: "60px", height: "60px" }}
                />
                <p className="nopostcontent">No Posts Yet</p>
              </div>
            )}

          {/* (activatefollow == "Follow" && photoscount <= 0 && ( */}
          {user.userauth.username !== profileUsername &&
            profileuseraccount === false &&
            activatefollow == "Following" &&
            gallery.length <= 0 && (
              <div className="nopostsyet">
                <AddAPhotoOutlinedIcon
                  style={{ width: "60px", height: "60px" }}
                />
                <p className="nopostcontent">No Posts Yet</p>
              </div>
            )}

          {user.userauth.username !== profileUsername &&
            profileuseraccount === false &&
            activatefollow == "Follow" && (
              <div className="nopostsyet">
                <LockOutlinedIcon style={{ width: "60px", height: "60px" }} />
                <span className="nopostcontent">
                  This is an Private Account
                </span>
                <p>Follow this account ton see their posts</p>
              </div>
            )}
          {user.userauth.username === profileUsername &&
            gallery.length <= 0 && (
              <div className="nopostsyet">
                <AddAPhotoOutlinedIcon
                  style={{ width: "60px", height: "60px" }}
                />
                <p className="nopostcontent">No Posts Yet</p>
              </div>
            )}
          {!gallery &&
            new Array(2)
              .fill(0)
              .map((_, i) => <Skeleton key={i} width={320} height={320} />)}
          {gallery && (
            <div className="gallery">
              {user.userauth.username !== profileUsername &&
                profileuseraccount === true &&
                gallery.length >= 1 && (
                  <>
                    {gallery.map((item) => (
                      <UserGallery
                        key={`${item.id}`}
                        galleryitem={item}
                        deleteitemid={removedeltedpost}
                      />
                    ))}
                  </>
                )}
              {user.userauth.username !== profileUsername &&
                profileuseraccount === false &&
                activatefollow == "Following" &&
                gallery.length > 0 && (
                  <>
                    {gallery.length >= 1 &&
                      gallery.map((item) => (
                        <UserGallery
                          key={`${item.id}`}
                          galleryitem={item}
                          deleteitemid={removepost}
                        />
                      ))}
                  </>
                )}
              {user.userauth.username === profileUsername &&
                gallery.length >= 1 &&
                gallery.map((item) => (
                  <UserGallery
                    key={`${item.id}`}
                    galleryitem={item}
                    deleteitemid={removepost}
                  />
                ))}
            </div>
          )}

          {/* <div className="gallery">
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
                        <FavoriteIcon style={{ marginRight: "5px" }} /> */}
          {/* <span className="visually-hidden">Likes:</span> */}
          {/* 56
                      </div>
                      <div className="gallery-item-comments">
                        <ChatBubbleIcon style={{ marginRight: "5px" }} />2 */}
          {/* <span className="visually-hidden">Comments:</span>2 */}
          {/* </div>
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
              </div> */}
          {/* <div className="loader"></div> */}
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
