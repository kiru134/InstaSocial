import { Avatar, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import classes from "./postCard.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { WidthFull } from "@mui/icons-material";

const BASE_URL = "https://socialmedia-api-odx6.onrender.com/";
const PostCard = ({ post }) => {
  const [username, getusername] = useState(null);
  const [comments, setComments] = useState([]);
  const [image_url, setImageUrl] = useState("");
  // const posttime = post.timestamp;
  // const postLikes = post.likes;
  const postLikes = 3;
  useEffect(() => {
    if (post.user.username === localStorage.getItem("username")) {
      getusername(post.user.username);
    }
  }, []);
  console.log(username);
  useEffect(() => {
    setComments(post.comments);
  }, []);

  useEffect(() => {
    if (post.image_url_type === "absolute") {
      setImageUrl(post.image_url);
    } else {
      setImageUrl(BASE_URL + post.image_url);
    }
  }, []);
  console.log(post.user.username);
  return (
    <div className={classes.post}>
      <div className={classes.post_header}>
        <div className={classes.post_header_avatar}>
          <button className={classes.muibutton}>
            <Avatar alt="user"></Avatar>
          </button>

          <h3>{post.user.username}</h3>
        </div>
        <button className={classes.muibutton}>
          <MoreHorizIcon></MoreHorizIcon>
        </button>
      </div>
      <div className={classes.post_image}>
        <img alt="postimage" src={image_url}></img>
      </div>
      <div className={classes.post_footer}>
        <div className={classes.post_footer_icons}>
          <div className={classes.post_iconsMain}>
            <FavoriteBorderIcon
              className={classes.postIcon}
            ></FavoriteBorderIcon>
            <ChatBubbleOutlineIcon
              className={classes.postIcon}
            ></ChatBubbleOutlineIcon>
          </div>
        </div>
      </div>
      <div>Liked by {postLikes}</div>
    </div>

    // <div className={classes.post}>
    //   <div className={classes.post_header}>
    //     <Avatar alt="user" src="" />
    //     <div className={classes.post_headerInfo}>
    //       {<h3>{post.user.username}</h3>}
    //       {username && <Button className={classes.post_delete}>Delete</Button>}
    //     </div>
    //   </div>
    //   <div className={classes.post}>
    //     <img className={classes.post_image} alt="postimage" src={image_url} />
    //   </div>
    //   <h4 className={classes.post_text}>{post.caption}</h4>
    //   <div className={classes.post_comments}>
    //     {comments.length > 1 &&
    //       comments.map((comment) => (
    //         <p>
    //           <strong>{comment.username}:</strong> {comment.text}
    //         </p>
    //       ))}
    //   </div>
    // </div>
  );
};

export default PostCard;
