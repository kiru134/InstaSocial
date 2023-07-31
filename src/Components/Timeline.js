import PostCard from "./postCard";
import classes from "./Timeline.module.css";
import Suggestions from "./Suggestion";
import useHttp from "../Hooks/usehttphook";
import React, { useState, useEffect } from "react";
import { Avatar, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const Timeline = (props) => {
  const { isLoading, error, sendRequest: fetchPosts } = useHttp();
  const [posts, setPosts] = useState([]);

  // const userID = window.localStorage.getItem("userId");

  const allPosts = (data) => {
    console.log("inside allPost function");
    console.log(data);
    setPosts(data);
  };

  if (error !== undefined) {
    console.log(error);
  }
  console.log("current username " + props.currentuser);
  useEffect(() => {
    fetchPosts(
      {
        url:
          BASE_URL +
          `post/postfeed?user_name=${encodeURIComponent(props.currentuser)}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
      allPosts
    );
    console.log("inside useeffect");
  }, []);

  console.log("Inside Timeline");
  console.log(posts.length);
  console.log(posts);
  return (
    <>
      {isLoading && <Loading></Loading>}
      <div className={classes.timeline}>
        {/* create skeleton here */}
        {posts.length >= 1 &&
          posts.map((post) => (
            <PostCard key={Math.random() * 1000} post={post} />
          ))}
      </div>
    </>
  );
};

export default Timeline;
