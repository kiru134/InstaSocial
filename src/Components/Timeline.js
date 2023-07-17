import PostCard from "./postCard";
import classes from "./Timeline.module.css";
import Suggestions from "./Suggestion";
import useHttp from "../Hooks/usehttphook";
import React, { useState, useEffect } from "react";
import { Avatar, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import { useSelector } from "react-redux/es/hooks/useSelector";

const BASE_URL = "https://ig-clone-api-production.up.railway.app/";
const Timeline = (props) => {
  const { isLoading, error, sendRequest: fetchPosts } = useHttp();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [userdp, setuserdp] = useState("");

  // const userID = window.localStorage.getItem("userId");

  const naviagtehandler = () => {
    // navigate("/profile");
    navigate(`/profile/${props.currentuser}`);
  };

  const allPosts = (data) => {
    console.log("inside allPost function");
    console.log(data);
    setPosts(data);
  };
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
  const currentuserstats = (data) => {
    setuserdp(data.dp);
  };
  useEffect(() => {
    fetchPosts(
      {
        url: BASE_URL + `users/user/${props.currentuser}`,
        method: "GET",
      },
      currentuserstats
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
        <div className={classes.timeline__left}>
          <div className={classes.timeline__posts}>
            {/* create skeleton here */}
            {posts.length >= 1 &&
              posts.map((post) => (
                <PostCard key={Math.random() * 1000} post={post} />
              ))}
          </div>
        </div>
        <div className={classes.timeline__right}>
          <div className={classes.userandsuggestions}>
            <div className={classes.userprofile}>
              <button
                style={{
                  border: "0px",
                  backgroundColor: "white",
                  cursor: "pointer",
                }}
                onClick={naviagtehandler}
              >
                <Avatar
                  alt="currentuser"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                  src={userdp}
                ></Avatar>
              </button>
              <h3>{props.currentuser}</h3>
            </div>

            {/* <UserProfile>
        </UserProfile> */}
            <Suggestions></Suggestions>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timeline;
