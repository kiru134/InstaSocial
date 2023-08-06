import { useSelector } from "react-redux/es/hooks/useSelector";
import useHttp from "../Hooks/usehttphook";
import { Avatar } from "@material-ui/core";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Followinglist = ({ following, profileuser }) => {
  let user = useSelector((state) => state.data.user);
  const { isLoading, error, sendRequest: updatefollowingstatus } = useHttp();
  const [followingstatus, setfollowbutton] = useState("");
  const { Loading, iserror, sendRequest: fetchfollowerprofile } = useHttp();

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
      if (user.userauth.username !== following.username) {
        await fetchfollowerprofile(
          {
            url:
              BASE_URL +
              `users/user?username=${encodeURIComponent(
                following.username
              )}&current_user=${encodeURIComponent(user.userauth.username)}`,
            headers: { "Content-Type": "application/json" },
          },
          checkfollower
        );
      }
    };
    awaituserprofile();
  }, []);

  const updatefollowing = (data) => {
    if (data.success == true && followingstatus == "Follow") {
      setfollowbutton("Following");
    } else {
      if (data.success == true && followingstatus == "Following") {
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
          following.username
        )}&follower=${encodeURIComponent(user.userauth.username)}`;
      sendmethod = "DELETE";
    } else {
      endpoint =
        BASE_URL +
        `users/add-follower?username=${encodeURIComponent(
          following.username
        )}&follower=${encodeURIComponent(user.userauth.username)}`;
      sendmethod = "POST";
    }
    await updatefollowingstatus(
      {
        url: endpoint,
        method: sendmethod,
        headers: { "Content-Type": "application/json" },
      },
      updatefollowing
    );
  };

  return (
    <>
      <div className="followerslistcontainer">
        <div className="followeravatar">
          <Avatar
            style={{ width: "40px", height: "40px" }}
            src={following.dp}
          ></Avatar>
        </div>
        <Link
          to={`/profile/${following.username}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="followersdetails">{following.username}</div>
        </Link>

        <div className="Removebutton">
          <button onClick={handlefollowbuttonclick}>
            {followingstatus === "Following" ? "Following" : "Follow"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Followinglist;
