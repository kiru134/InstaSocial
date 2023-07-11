import Header from "../../Components/CommonHeader";
import Profilepic from "./profilephoto";
import Profileheader from "./Profileheader";
import "./mainprofile.css";
const Dummy = () => {
  return (
    <div className="userprofile">
      <Header></Header>
      <div className="profileheader_container">
        <Profileheader
          // currentuser={username}
          currentuser="kiru"
          // profile={userID:"1",fullname="kirankiru",following={},profiledescription="Hello Stranger",profilePicture=null}
          /* //             // in the profile e should get the userId,fullName,following=[](list of following people),profile description,profilepicture */

          // photoscount={photos ? photosCollection.length : 0}
          photoscount={5}
          followerCount={12}
          followingCount={13}
          // followerCount={followerCount}
          // followingCount={followingCount}
          // setFollowerCount={dispatch}
          // call the api post method to update the followings of currentuser & follower of profile viewd user using their username
        ></Profileheader>
      </div>
      {/* <Profilepic photos={photosCollection}></Profilepic> */}
    </div>
  );
};

export default Dummy;

// return (
//   <>
//     <Header></Header>
//     <>
//       <p
//         style={{
//           display: "grid",
//           gridTemplateColumns: "30% 70%",
//           padding: "4rem 0",
//         }}
//       >
//         Build the profile here
//       </p>
//     </>
//   </>
// );
// return (
//     <div className="userprofile">
//       <Header></Header>
//       <div/>
//       )

//       }

{
  /* // add Common header component */
}
{
  /* <div className="mx-auto max-w-screen-lg">
          <div>
            <Profileheader
              currentuser={username}
              profile={profile} */
}
{
  /* //             // in the profile e should get the userId,fullName,following=[](list of following people),profile description,profilepicture */
}
/* photoscount={photos ? photosCollection.length : 0}
              followerCount={followerCount}
              followingCount={followingCount}
              setFollowerCount={dispatch}
            ></Profileheader>
          </div>
          <Profilepic photos={photosCollection}></Profilepic>
        </div>

        <p>Hi kiran</p>*/
