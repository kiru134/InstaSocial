import { useSelector } from "react-redux/es/hooks/useSelector";
import useHttp from "../Hooks/usehttphook";
import { Avatar } from "@material-ui/core";
import { useLocation, Link } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Followerlist = ({ follower, profileuser, setremovefollower }) => {
  let user = useSelector((state) => state.data.user);
  const { isLoading, error, sendRequest: removeuser } = useHttp();

  const getremovestatus = (data) => {
    if (data.success == true) {
      setremovefollower(follower);
    } else {
      setremovefollower(null);
    }
  };
  const handleremovefollower = async () => {
    await removeuser(
      {
        url:
          BASE_URL +
          `users/remove-follower?username=${encodeURIComponent(
            user.userauth.username
            
          )}&follower=${encodeURIComponent(follower.username)}`,
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
      getremovestatus
    );
  };

  return (
    <>
      <div className="followerslistcontainer">
        <div className="followeravatar">
          <Avatar style={{ width: "40px", height: "40px" }}
          src={follower.dp}>
            
          </Avatar>
        </div>
        <Link to={`/profile/${follower.username}`}style={{ textDecoration: "none", color: "black" }}>
        <div className="followersdetails">{follower.username}</div>
        </Link>
        {profileuser === user.userauth.username && (
          <div className="Removebutton">
            <button onClick={handleremovefollower}>Remove</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Followerlist;
