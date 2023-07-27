import { Avatar, Button } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import classes from "./postCard.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Comments from "./comments";
import Footer from "./postFooter";
import LikedActions from "./likeActions";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import NewComment from "./Commentsection/newcomment";

const BASE_URL = "https://ig-clone-api-production.up.railway.app/";
const PostCard = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [image_url, setImageUrl] = useState("");
  const commentInput = useRef(null);

  const handleFocus = () => commentInput.current.focus();
  let user = useSelector((state) => state.data.user);

  const currentuserinphotolike = post.likes.find(
    (o) => o.username === `${user.userauth.username}`
  );

  const validatecurrentuserlikedpost = () => {
    if (currentuserinphotolike != undefined) {
      return true;
    } else {
      return false;
    }
  };

  console.log(post.likes);
  console.log(post.comments);
  const [liked, setlikedphoto] = useState(validatecurrentuserlikedpost);

  useEffect(() => {
    setComments(post.comments);
  }, []);
  useEffect(() => {
    setlikedphoto(!liked);
  }, []);
  useEffect(() => {
    if (post.image_url_type === "absolute") {
      setImageUrl(post.image_url);
    } else {
      setImageUrl(BASE_URL + post.image_url);
    }
  }, []);

  console.log(post.user.username);
  console.log(post.user);
  console.log(post.id);
  console.log(post);
  console.log("post card liked status" + liked);
  return (
    <div className={classes.post}>
      <div className={classes.post_header}>
        <div className={classes.post_header_avatar}>
          <button className={classes.muibutton}>
            <Link to={`/profile/${post.user.username}`}>
              <Avatar
                alt="user"
                src={post.user.dp}
                style={{ width: "32px", height: "32px", marginRight: "12px" }}
              ></Avatar>
            </Link>
          </button>
          <h3>{post.user.username}</h3>
        </div>
        <button className={classes.muibutton}>
          <MoreHorizIcon></MoreHorizIcon>
        </button>
      </div>
      <div className={classes.post_image}>
        <img alt={post.caption} src={image_url}></img>
      </div>
      <LikedActions
        pid={post.id}
        islikedPhoto={validatecurrentuserlikedpost}
        totalLikes={post.likes.length}
        handleFocus={handleFocus}

        // here likestatus we get if the user has liked the photo the status=true
        // if the user has unlinked the photo then status false.
      ></LikedActions>

      <Footer caption={post.caption} username={post.user.username}></Footer>
      {/* send the totallikes islikedPhoto to comment component as well */}
      <NewComment
        postdetails={post}
        image={image_url}
        islikedPhoto={validatecurrentuserlikedpost}
        commentInput={commentInput}
      />
      {/* <Comments
        pid={post.id}
        image={image_url}
        postuser={post.user.username}
        postuserdp={post.user.dp}
        allComments={post.comments}
        posted={post.timestamp}
        commentInput={commentInput}
      /> */}
    </div>
  );
};

export default PostCard;
