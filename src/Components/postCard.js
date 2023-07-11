import { Avatar, Button } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import classes from "./postCard.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Comments from "./comments";
import Footer from "./postFooter";
import LikedActions from "./likeActions";

// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

// In post we get likes field which has user ID's of users who has liked the post

// if the current user userID is not in likes field then toggleLikes1

const BASE_URL = "https://socialmedia-api-odx6.onrender.com/";
const PostCard = ({ post }) => {
  // const [username, getusername] = useState(post.user.username)
  const [comments, setComments] = useState([]);
  const [image_url, setImageUrl] = useState("");
  const [likes, setLikes] = useState(0);
  const [togglelikes, setToggledLikes] = useState();
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  // const posttime = post.timestamp;
  // const postLikes = post.likes;
  let likedPhoto = false;
  let postLikes = 3;
  // useEffect(() => {
  //   if (post.user.username === localStorage.getItem("username")) {
  //     getusername(post.user.username);
  //   }
  // }, []);
  // console.log(username);
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
  // uncomment this part
  // useEffect(() => {
  //   if (post.likes.includes(localStorage.getItem("userId"))) {
  //     likedPhoto = true;
  //   }
  // }, [likedPhoto]);

  // const handleLikes = () => {
  //   // http call put request in useeffect and function to update the likes
  //   setLikes = postLikes + 1;
  //   postLikes = postLikes + 1;
  // };

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
        <img alt={post.caption} src={image_url}></img>
      </div>
      <div className={classes.post_footer}>
        {/* <LikedActions
          uid={post.userID}
          islikedPhoto={likedPhoto}
          totalLikes={post.likes.length}
          handleFocus={handleFocus}
        ></LikedActions> */}

        <Footer caption={post.caption} username={post.user.username}></Footer>
        {/* <Comments
          docId={post.postID}
          comments={post.comments}
          posted={post.dateCreated}
          commentInput={commentInput}
        /> */}
        {/* <div className={classes.post_footer_icons}>
          <div className={classes.post_iconsMain}>
            <FavoriteIcon
              className={likes ? classes.fillcomp : classes.postIcon}
              onClick={handleLikes}
            ></FavoriteIcon>

            <ChatBubbleOutlineIcon
              className={classes.postIcon}
            ></ChatBubbleOutlineIcon>
          </div>
        </div> */}
      </div>
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
