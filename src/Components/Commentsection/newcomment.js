// to this first fetch the length of comments from postcard component
// on click of view all comment button modal should open up
// from the add comment component get the latest comment added from the input field
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NewCommentModal from "./newCommentModal";
import AddCommentInput from "./addCommentInput";
import { Avatar } from "@material-ui/core";

export default function NewComment({
  postdetails,
  image,
  islikedPhoto,
  commentInput,
}) {
  // const [commentsSlice, setCommentsSlice] = useState(2);
  const [openCommentModal, setCommentModal] = useState(false);
  const [recentcomment, setrecentcomment] = useState({});

  const handleonClick = () => {
    setCommentModal(true);
    setrecentcomment({});
  };

  if (!(Object.keys(recentcomment).length === 0)) {
    postdetails.comments.length = postdetails.comments.length + 1;
  }
  return (
    <>
      <div className="commentcontainer">
        {/* {(Object.keys(recentcomment).length != 0) } */}
        {postdetails.comments.length > 1 && (
          <button onClick={handleonClick}>
            <p className="viewallcommentscontainer">
              View all {postdetails.comments.length} comments
            </p>
          </button>
        )}
        {openCommentModal && (
          <NewCommentModal
            post={postdetails}
            postimage={image}
            // postimage={image}
            // posteduser={postdetails.user.username}
            // dp={postuserdp}
            modalclosed={() => setCommentModal(!openCommentModal)}
            // postid={pid}
            islikedPhoto={islikedPhoto}

            // totalLikes={postdetails.likes.length}
          ></NewCommentModal>
        )}
        {!(Object.keys(recentcomment).length === 0) && (
          //   <p key={`${recentcomment[0].timestamp}-${recentcomment[0].user.username}`}>
          <div className="recentcommentitemontimeline">
            <Link
              to={`/profile/${recentcomment.user.username}`}
              style={{ marginRight: "8px" }}
            >
              <Avatar
                alt={recentcomment.user.username}
                style={{
                  width: "20px",
                  height: "20px",
                  marginBottom: "2px",
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
        )}
        {/* //   <p>
        //     <Link
        //       to={`/profile/${recentcomment.user.username}`}
        //       className="commentedusername"
        //     >
        //       <span>{recentcomment.user.username}</span>
        //     </Link>
        //     <span>{recentcomment.text}</span>
        //   </p>
        // )} */}
        <AddCommentInput
          docId={postdetails.id}
          // setComments={setComments}
          setrecentcomment={setrecentcomment}
          commentInput={commentInput}
        />
      </div>
    </>
  );
}
