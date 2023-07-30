import { useSelector } from "react-redux/es/hooks/useSelector";
import useHttp from "../Hooks/usehttphook";
import { Avatar } from "@material-ui/core";
const BASE_URL = "https://ig-clone-api-production.up.railway.app/";

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
            follower.username
          )}&follower=${encodeURIComponent(user.userauth.username)}`,
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
          <Avatar style={{ width: "40px", height: "40px" }}>
            src={follower.dp}
          </Avatar>
        </div>
        <div className="followersdetails">{follower.username}</div>
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
