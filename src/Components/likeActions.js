import { useState } from "react";
import useHttp from "../Hooks/usehttphook";
import { useSelector } from "react-redux/es/hooks/useSelector";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import "./Actions.css";
const BASE_URL = "https://ig-clone-api-production.up.railway.app/";

const LikedActions = ({ pid, islikedPhoto, totalLikes, handleFocus }) => {
  const [toggleLiked, setToggleLiked] = useState(islikedPhoto);
  const [likes, setLikes] = useState(totalLikes);
  const { isLoading, error, sendRequest: updateLikes } = useHttp();
  let user = useSelector((state) => state.data.user);

  const likesetter = (data) => {
    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };
  console.log(error);
  console.log(likes);
  console.log(pid);

  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);
    let endpoint = "";
    let method = "POST";
    if (toggleLiked) {
      endpoint = BASE_URL + "post/likes/remove";
      method = "DELETE";
    } else {
      endpoint = BASE_URL + "post/likes/add";
    }
    const json_string = JSON.stringify({
      username: user.userauth.username,
      post_id: pid,
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
      <div className="actioncontainer">
        <div className="actionconatiner_container">
          {/* <FavoriteTwoToneIcon
            onClick={handleToggleLiked}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleToggleLiked();
              }
            }}
            className={
              "likesvg" +
              (toggleLiked ? "likesvgclicked " : "likesvgnotclicked")
            }
          /> */}
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
            className={`likesvg + ${
              toggleLiked ? "likesvgclicked" : "likesvgnotclicked"
            }`}
            // className={`w-8 mr-4 select-none cursor-pointer focus:outline-none ${
            //   toggleLiked ? "fill-red text-red-primary" : "text-black-light"
            // }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <svg
            onClick={handleFocus}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleFocus();
              }
            }}
            className="commentssvg"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            tabIndex={0}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
      </div>
      <div className="likesdisplay">
        <p style={{ fontWeight: "700" }}>
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </p>
      </div>
    </>
  );
};

export default LikedActions;
