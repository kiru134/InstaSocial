// import React, { useState, useEffect, useReducer } from "react";
// import { useParams } from "react-router-dom";
// import ProfileHeader from "../Components/userprofileheader";
// import ProfilePhoto from "../Components/ProfileProtos";
// const Userprofile = () => {
//   const { isLoading, error, sendRequest: fetchProfileInfo } = useHttp();
//   let authToken = window.localStorage.getItem("authToken");
//   const username = window.localStorage.getItem("username");
//   const [userId, setUserId] = useState("");
//   let { userID } = useParams();

//   useEffect(() => {
//     authToken = window.localStorage.getItem("authToken");
//        if (userID === window.localStorage.getItem("userId")){
//         (setUserId(userID))
//        }
//   }, [userID]);
//   const reducer = (state, newState) => ({ ...state, ...newState });
//   const initialState = {
//     profile: {},
//     //   profile contains user fullname and username
//     photosCollection: [],
//     followerCount: 0,
//     followingCount: 0,
//   };

//   const [
//     { profile, photosCollection, followerCount, followingCount },
//     dispatch,
//   ] = useReducer(reducer, initialState);

//   const profileInfo = (data) => {
//     dispatch({
//       profile: data.profile,
//       photosCollection: data.photosCollection,
//       followerCount: data.followers.length,
//       followingCount: data.following.length,
//     });
//   };
//   useEffect(() => {
//     const getprofileinfo = async () => {
//       await fetchProfileInfo(
//         {
//           url: BASE_URL + "profile/userid",
//           method: "GET",
//         },
//         profileInfo
//         // we get the array of all the info
//       );
//     };
//     getprofileinfo;
//   }, [userid]);

//   return authToken ? (
//     <div className="bg-gray-background">
//       {/* // add Common header component */}
//       <div className="mx-auto max-w-screen-lg">
//         <div>
//           <ProfileHeader
//             currentuser={username}
//             profile={profile}
//             // in the profile e should get the userId,fullName,following=[](list of following people),profile description,profilepicture
//             photoscount={photos ? photosCollection.length : 0}
//             followerCount={followerCount}
//             followingCount={followingCount}
//             setFollowerCount={dispatch}
//           ></ProfileHeader>
//         </div>
//         <ProfilePhoto photos={photosCollection}></ProfilePhoto>
//       </div>

//       <p>Hi kiran</p>
//     </div>
//   ) : null;
// };

// export default Userprofile;
