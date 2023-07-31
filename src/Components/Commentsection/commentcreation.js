import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import useHttp from "../../Hooks/usehttphook";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { formatDistance } from "date-fns";

import Commentdeletemodal from "./deletecommentmodal";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const Createcomment = ({ item, deletecomment, postuser }) => {
  let user = useSelector((state) => state.data.user);
  const currentuserinphotolike = item.likes.find(
    (o) => o.username === `${user.userauth.username}`
  );
  const islikedPhoto = () => {
    if (currentuserinphotolike != undefined) {
      return true;
    } else {
      return false;
    }
  };

  let distance = formatDistance(Date.now(), new Date(item.timestamp));
  console.log(new Date(item.timestamp));
  console.log(item.timestamp);
  console.log(distance);
  const [toggleLiked, setToggleLiked] = useState(islikedPhoto);
  const [likes, setLikes] = useState(item.likes.length);
  const { isLoading, error, sendRequest: updateLikes } = useHttp();
  const [deletecomplete, setCommentdeleteModal] = useState(false);
  // const [deleteacess, setdeleteaccess] = useState(false);

  const checkcommenteduser = () => {
    if (
      item.user.username === user.userauth.username ||
      item.post_id === postuser
    ) {
      // setdeleteaccess(true);
      return true;
    } else {
      // setdeleteaccess(false);
      return false;
    }
  };

  // console.log(checkcommenteduser());

  const getdeletedcommentid = (id) => {
    deletecomment(id);
  };
  const likesetter = (data) => {
    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };

  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);
    let endpoint = "";
    let method = "POST";
    if (toggleLiked) {
      endpoint = BASE_URL + "comment/likes/remove";
      method = "DELETE";
    } else {
      endpoint = BASE_URL + "comment/likes/add";
    }
    const json_string = JSON.stringify({
      username: user.userauth.username,
      comment_id: item.id,
    });
    await updateLikes(
      {
        url: endpoint,
        method: method,
        headers: { "Content-Type": "application/json" },
        body: json_string,
      },
      likesetter
    );
  };

  return (
    <>
      <div
        className="commentitem"
        key={`${item.timestamp}-${item.user.username}`}
      >
        <div className="avatarcommentitem">
          <Link
            to={`/profile/${item.user.username}`}
            style={{ marginRight: "18px" }}
          >
            <Avatar
              alt={item.user.username}
              style={{
                width: "30px",
                height: "30px",
              }}
              src={item.user.dp}
            ></Avatar>
          </Link>
          <div className="comment">
            <div className="commentedcontainer">
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "12px",
                  marginRight: "3px",
                }}
              >
                <Link
                  to={`/profile/${item.user.username}`}
                  className="commentedusername"
                >
                  {item.user.username}
                </Link>

                {item.text}
              </span>
            </div>

            <div className="commentsactionsection">
              {/* timestamp */}
              <p className="commenteddate">
                {distance.substring(distance.indexOf(distance.match(/\d+/g)))}{" "}
              </p>
              {likes > 0 && (
                <p style={{ fontWeight: "500", margin: "0px 5px 0px 0px" }}>
                  {likes === 1 ? `${likes} like` : `${likes} likes`}
                </p>
              )}
              {/* display option to delete the comment only on hover only for posted user and comment user */}
              {checkcommenteduser() && (
                <button
                  style={{ background: "none", border: 0 }}
                  onClick={() => setCommentdeleteModal(true)}
                >
                  <MoreHorizIcon />
                </button>
              )}
              {deletecomplete && (
                <Commentdeletemodal
                  modalclosed={() => setCommentdeleteModal(!deletecomplete)}
                  cid={item.id}
                  deletedcommentid={getdeletedcommentid}
                />
              )}
            </div>
          </div>
        </div>
        <svg
          onClick={handleToggleLiked}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleToggleLiked();
            }
          }}
          xmlns="http://www.w3.org/2000/svg"
          // fill="none"
          viewBox="0 0 24 24"
          stroke="currentcolor"
          tabIndex={0}
          style={{ flexDirection: "flexstart" }}
          className={`likesvg + ${
            toggleLiked ? "likesvgclicked" : "likesvgnotclicked"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
    </>
  );
};

export default Createcomment;
