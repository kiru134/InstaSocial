import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { MetroSpinner } from "react-spinners-kit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux/es/hooks/useSelector";

import {
  Avatar,
  Button,
  Modal,
  Typography,
  makeStyles,
} from "@material-ui/core";
import useHttp from "../../Hooks/usehttphook";
import Footer from "../postFooter";
import { formatDistance } from "date-fns";
import AddCommentInput from "./addCommentInput";
import { Link } from "react-router-dom";
import LikedActions from "../likeActions";
import InfiniteScroll from "react-infinite-scroll-component";
import Createcomment from "./commentcreation";
import Postdeletemodal from "../deletePostmodal";

// import "./newcomment.css";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    variant: "outlined",
    backgroundColor: theme.palette.background.paper,
    position: "absolute",
    height: "87%",
    width: "60%",
    // minWidth: "600px",
    minHeight: "450px",
    // border: "1px solid #000",
    boxShadow: theme.shadows[5],
    border: "0px",
    borderRadius: "6px",
    // padding: theme.spacing(2, 4, 3),
    "@media (max-width: 600px)": {
      width: "90%",
      height: "87%",
    },
  },
}));
const PAGE_SIZE = 12;

const NewCommentModal = ({
  post,
  postimage,
  // postimage,
  // posteduser,
  // dp,
  modalclosed,
  commentscount,
  // pid,
  islikedPhoto,

  likescount,

  // totalLikes,
}) => {
  const modalclasses = useStyles();
  const {
    isLoading,
    error,
    sendRequest: fetchcommentconditionally,
  } = useHttp();
  const [modalStyle, setModalStyle] = useState(getModalStyle);
  const [openModal, setOpenModal] = useState(true);
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recentcomment, setrecentcomment] = useState({});
  const [deletepostmodal, setpostdeleteModal] = useState(false);
  const [checkpostdeleted, setpostdelete] = useState(false);

  let distance = formatDistance(Date.now(), new Date(post.timestamp));
  const commentInput = useRef(null);
  const handlecommentFocus = () => commentInput.current.focus();
  let user = useSelector((state) => state.data.user);

  useEffect(() => {
    setComments([]);
    setCurrentPage(1);
    fetchComments();
  }, [openModal]);

  console.log("inside modal");

  const handleonclose = () => {
    setOpenModal(!openModal);
    modalclosed(true);
  };

  const removecomment = (id) => {
    setComments((current) => current.filter((item) => item.id !== id));
    commentscount((prevcount) => prevcount - 1);
    // likescount,updatelikescount and commentcountafteradding comment
  };

  // const getpostdeletedstatus = (status) => {
  //   if (status == true) {
  //     validatepostdelete((prev) => !prev);
  //     setOpenModal(!openModal);
  //     modalclosed(true);
  //   }
  // };

  if (checkpostdeleted === true) {
    window.location.reload(true);
  }

  const addcomment = (status) => {
    if (status === true) commentscount((prevcount) => prevcount + 1);
  };
  const setlikescount = (status) => {
    if (status === true) {
      likescount((prevcount) => prevcount + 1);
    } else likescount((prevcount) => prevcount - 1);
  };
  const newcomments = (data) => {
    if (data.length > 0) {
      setComments([...comments, ...data]);
      setHasMore(true);
      console.log("inside new comment if block");
      // setComments((prevComments) => [...prevComments, ...data]);
      setCurrentPage(currentPage + 1);
    } else {
      setHasMore(false);
    }
    console.log(data);
  };

  console.log(hasMore);

  const fetchComments = async () => {
    const apiUrl = `https://ig-clone-api-production.up.railway.app/comment/all/${post.id}?page=${currentPage}&limit=${PAGE_SIZE}`;
    await fetchcommentconditionally(
      {
        url: apiUrl,
        headers: { "Content-Type": "application/json" },
      },
      newcomments
    );

    console.log("inside fetch function");
  };

  return ReactDOM.createPortal(
    <>
      <Modal open={openModal} onClose={handleonclose}>
        <div style={modalStyle} className={modalclasses.paper}>
          <div className="commentsModalconatiner">
            {/* <div className="commentsModalconatiner_section"> */}
            <div className="modalcontainerpartitioner_left">
              <img src={postimage}></img>
            </div>
            <div className="modalcontainerpartitioner_right">
              <div className="posteduserdetails">
                <Link
                  to={`/profile/${post.user.username}`}
                  style={{ marginRight: "18px" }}
                >
                  <Avatar
                    alt={post.user.username}
                    style={{
                      width: "30px",
                      height: "30px",
                    }}
                    src={post.user.dp}
                  ></Avatar>
                </Link>
                {/* </button> */}
                <h3 style={{ fontWeight: 600, fontSize: "12px" }}>
                  {post.user.username}
                </h3>
                {/* if the post.id and logged in user userid is same then delete post option can be seen */}
                {post.user.id === user.userauth.userId && (
                  <button
                    style={{ background: "none", border: 0 }}
                    onClick={() => setpostdeleteModal(true)}
                  >
                    <MoreVertIcon />
                  </button>
                )}
                {deletepostmodal && (
                  <Postdeletemodal
                    post={post}
                    currentuser={user.userauth}
                    modalclosed={() => setpostdeleteModal(!deletepostmodal)}
                    postdeletedstatus={setpostdelete}
                  />
                )}
              </div>
              <div id="scrollableDiv" className="commentsdisplaysection">
                {/* {post.comments.length === 0 && <p>No Comments yet</p>} */}
                {/* {post.comments.length > 0 && ( */}
                <div className="postcaption">
                  <Link
                    to={`/profile/${post.user.username}`}
                    style={{ marginRight: "18px" }}
                  >
                    <Avatar
                      alt={post.user.username}
                      style={{
                        width: "30px",
                        height: "30px",
                      }}
                      src={post.user.dp}
                    ></Avatar>
                  </Link>
                  <Footer
                    caption={post.caption}
                    username={post.user.username}
                  ></Footer>
                </div>
                {post.comments.length === 0 && (
                  <h2 className="nocommentscontent">No Comments yet...</h2>
                )}
                {post.comments.length > 0 && (
                  <InfiniteScroll
                    dataLength={comments.length}
                    next={fetchComments}
                    hasMore={hasMore}
                    // endMessage={<p>No more comments</p>}

                    scrollableTarget="scrollableDiv"
                    style={{ width: "100%" }}
                  >
                    {comments.map((item) => {
                      return (
                        <Createcomment
                          key={item.id}
                          item={item}
                          deletecomment={removecomment}
                          postuser={post.user.username}
                        ></Createcomment>
                        // <div
                        //   className="commentitem"
                        //   key={`${item.timestamp}-${item.user.username}`}
                        // >
                        //   <Link
                        //     to={`/profile/${item.user.username}`}
                        //     style={{ marginRight: "18px" }}
                        //   >
                        //     <Avatar
                        //       alt={item.user.username}
                        //       style={{
                        //         width: "30px",
                        //         height: "30px",
                        //       }}
                        //       src={item.user.dp}
                        //     ></Avatar>
                        //   </Link>
                        //   <Link
                        //     to={`/profile/${item.user.username}`}
                        //     className="commentedusername"
                        //   >
                        //     <span
                        //       style={{
                        //         fontWeight: 600,
                        //         fontSize: "12px",
                        //         marginRight: "3px",
                        //       }}
                        //     >
                        //       {item.user.username}
                        //     </span>
                        //   </Link>
                        //   <span>{item.text}</span>
                        // </div>
                      );
                    })}
                    {!(Object.keys(recentcomment).length === 0) && (
                      //   <p key={`${recentcomment[0].timestamp}-${recentcomment[0].user.username}`}>

                      <Createcomment
                        key={recentcomment.id}
                        item={recentcomment}
                        deletecomment={removecomment}
                      ></Createcomment>
                    )}
                  </InfiniteScroll>
                )}
              </div>
              <div className="loadercontainer">
                {post.comments.length > 0 && isLoading && (
                  <div className="loadingspinner">
                    <MetroSpinner size={30} color="#808080" />
                  </div>
                )}
              </div>

              <div className="commentsandlikescontainer">
                <div className="likecommentactions">
                  <LikedActions
                    pid={post.id}
                    islikedPhoto={islikedPhoto}
                    totalLikes={post.likes.length}
                    handleFocus={handlecommentFocus}
                    likestatus={setlikescount}

                    // handlemodalpopup={handlecommentmodal}
                  ></LikedActions>
                </div>
                <p className="posteddate">
                  {distance.substring(distance.indexOf(distance.match(/\d+/g)))}{" "}
                  ago
                </p>
                {/* call the addcommentInput */}
                <AddCommentInput
                  docId={post.id}
                  // comments={comments}
                  //    setComments={setComments}
                  setrecentcomment={setrecentcomment}
                  commentInput={commentInput}
                  addcommentcount={addcomment}
                ></AddCommentInput>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>,
    document.getElementById("portal")
  );
};

export default NewCommentModal;
