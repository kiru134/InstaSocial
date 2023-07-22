import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { RotatingLines } from "react-loader-spinner";
import { MetroSpinner } from "react-spinners-kit";
//   PushSpinner,
//   TraceSpinner,
//   RainbowSpinner,
//   RingSpinner,
//   SwishSpinner,
//   PongSpinner,

//   JellyfishSpinner,
// }
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
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
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
  // pid,
  islikedPhoto,

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

  let distance = formatDistance(Date.now(), new Date(post.timestamp));
  const commentInput = useRef(null);
  const handlecommentFocus = () => commentInput.current.focus();

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
              {
                /* call the addcomment class,from addcomment take the comments and display in this modal and also increment the count of the comment in the parent */
                //   here make the infinite scroll,use the axios to call the comment pagination api
              }
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
                <InfiniteScroll
                  dataLength={comments.length}
                  next={fetchComments}
                  hasMore={hasMore}
                  //   <span class="loader"></span>
                  // <RotatingLines
                  //   className="loadingspinner"
                  //   strokeColor="grey"
                  //   strokeWidth="3"
                  //   animationDuration="0.75"
                  //   height="30"
                  //   width="30"
                  // />

                  // loader={<h4>Loading...</h4>}
                  // <div loadingspinner>
                  //
                  //   </div>

                  /* 
                      />  */

                  // endMessage={<p>No more comments</p>}
                  // height={300}
                  scrollableTarget="scrollableDiv"
                >
                  {comments.map((item) => {
                    return (
                      <div
                        className="commentitem"
                        key={`${item.timestamp}-${item.user.username}`}
                      >
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
                        <Link
                          to={`/profile/${item.user.username}`}
                          className="commentedusername"
                        >
                          <span
                            style={{
                              fontWeight: 600,
                              fontSize: "12px",
                              marginRight: "3px",
                            }}
                          >
                            {item.user.username}
                          </span>
                        </Link>
                        <span>{item.text}</span>
                      </div>
                    );
                  })}
                  {!(Object.keys(recentcomment).length === 0) && (
                    //   <p key={`${recentcomment[0].timestamp}-${recentcomment[0].user.username}`}>
                    <div className="commentitem">
                      <Link
                        to={`/profile/${recentcomment.user.username}`}
                        style={{ marginRight: "18px" }}
                      >
                        <Avatar
                          alt={recentcomment.user.username}
                          style={{
                            width: "30px",
                            height: "30px",
                          }}
                          src={recentcomment.user.dp}
                        ></Avatar>
                      </Link>
                      <Link
                        to={`/profile/${recentcomment.user.username}`}
                        className="commentedusername"
                      >
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: "12px",
                            marginRight: "3px",
                          }}
                        >
                          {recentcomment.user.username}
                        </span>
                      </Link>
                      <span>{recentcomment.text}</span>
                    </div>
                    // <p>
                    //   <Link
                    //     to={`/profile/${recentcomment.user.username}`}
                    //     className="commentedusername"
                    //   >
                    //     <span>{recentcomment.user.username}</span>
                    //   </Link>
                    //   <span>{recentcomment.text}</span>
                    // </p>
                  )}
                </InfiniteScroll>
                {/* )} */}
              </div>
              <div className="loadercontainer">
                {isLoading && (
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
