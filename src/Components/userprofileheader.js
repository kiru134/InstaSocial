// import { useState, useEffect } from "react";
// // import PropTypes from "prop-types";
// import { Skeleton } from "react-loading-skeleton";
// import useHttp from "../Hooks/usehttphook";

// const ProfileHeader = ({
//   currentuser,
//   profile,
//   photoscount,
//   followerCount,
//   followingCount,
// }) => {
//   const [isFollowing, setisFollowing] = useState("false");
//   const [displayfollowbutton, setdisplayfollowbutton] = useState("false");
//   useEffect(()=>{
//     if (currentuser!= window.localStorage.getItem('username')){
//         check in the follower list of the given user whether current user exists
//         accordingly set the isfollowing state
//    let following user = profile.following.find(currentuser){
//      if(followinguser){
//         setisFollowing(true)
//      }
// }
// }
//     }
//   },[])
//   const handletogglefollow = () => {
//     setisFollowing((isFollowing = !isFollowing));
//     // dispatch
//     // setfollowccount({
//     //     followerCount:isFollowing? Number(profile.followers+1):Number(profile.followers-1)
//     // })
//     // if user is following then api call to update the follower
//   };

//   if (currentuser != window.localStorage.getItem("username")) {
//     setdisplayfollowbutton(true);
//   }
//   return (
//     <>
//       <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
//         <div className="container flex justify-center">
//           <img className="rounded-full h-40 w-40 flex">
//             <Avatar>
//               {/* "profile picture * ? scr=profile picture:""> */}
//             </Avatar>
//           </img>
//         </div>
//         <div className="justify-center items-center flex-col:col-span-2 display:flex items-center">
//           <div className="container flex items-center">
//             <p className="text-2xl mr-4">{profile.username}</p>
//             {displayfollowbutton && (
//               <button
//                 className="bg-blue-medium font-bolf text-sm rounded text-white w-20 h-8"
//                 type="button"
//                 onClick={handletogglefollow}
//               >
//                 {isFollowing ? "Unfollow" : "Follow"}
//               </button>
//             )}
//           </div>
//           <div className="container flex mt-4">
//             {followerCount === undefined ? (
//               <Skeleton count={1} width={677} height={24} />
//             ) : (
//               <>
//                 <p className="mr-10">
//                   <span className="font-bold">{photoscountCount}</span>
//                   photos
//                 </p>
//                 <p className="mr-10">
//                   <span className="font-bold">{followerCount}</span>
//                   {followerCount === 1 ? "follower" : "followers"}
//                 </p>
//                 <p className="mr-10">
//                   <span className="font-bold">{followingCount}</span>
//                   following
//                 </p>
//               </>
//             )}
//             <div className="container mt-4">
//               <p className="font-medium">
//                 {!profile.fullName ? (
//                   <Skeleton count={1} height={24} />
//                 ) : (
//                   profile.fullName
//                 )}
//               </p>
//               {/* <p>
//         {fir profile description}
//     </p> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProfileHeader;
