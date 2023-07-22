import { useState, useEffect } from "react";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddComment from "./add-comment";
import "./comment.css";
import CommentModal from "./CommentModal";

export default function Comments({
  pid,
  image,
  postuser,
  postuserdp,
  allComments,
  posted,
  commentInput,
}) {
  const [comments, setComments] = useState(allComments);
  const [commentsSlice, setCommentsSlice] = useState(2);
  const [openCommentModal, setCommentModal] = useState(false);
  const [recentcomment, setrecentcomment] = useState(false);
  let distance = formatDistance(Date.now(), new Date(posted));
  const showNextComments = () => {
    setCommentsSlice(commentsSlice + 1);
  };
  console.log(new Date(posted));
  // console.log(comments[0].user.username);

  return (
    <>
      <div className="commentcontainer">
        {comments.length >= 1 && (
          <button onClick={() => setCommentModal(true)}>
            <p className="viewallcommentscontainer">
              View all {comments.length} comments
            </p>
          </button>
        )}
        {openCommentModal && (
          <CommentModal
            postimage={image}
            posteduser={postuser}
            dp={postuserdp}
            modalclosed={() => setCommentModal(!openCommentModal)}
          ></CommentModal>
        )}
        {recentcomment && (
          <p key={`${comments[0].timestamp}-${comments[0].user.username}`}>
            <Link
              to={`/profile/${comments[0].user.username}`}
              className="commentedusername"
            >
              <span>{comments[0].user.username}</span>
            </Link>
            <span>{comments[0].text}</span>
          </p>
        )}
        {/* {comments.slice(0, commentsSlice).map((item) => (
          <p key={`${item.timestamp}-${item.user.username}`}>
            <Link
              to={`/profile/${item.user.username}`}
              className="commentedusername"
            >
              <span>{item.user.username}</span>
            </Link>
            <span>{item.text}</span>
          </p>
        ))} */}

        {/* {comments.length >= 2 && commentsSlice < comments.length && (
          <button
            type="button"
            onClick={showNextComments}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                showNextComments();
              }
            }}
          >
            View more comments
          </button>
        )} */}
        <p className="posteddate">
          {distance.substring(distance.indexOf(distance.match(/\d+/g)))} ago
        </p>
      </div>
      {/* <div style={{ borderTop: 1px_solid_black }}>
        <p>This</p>
      </div> */}
      <AddComment
        docId={pid}
        comments={comments}
        setComments={setComments}
        setrecentcomment={setrecentcomment}
        commentInput={commentInput}
      />
    </>
  );
}

// To do
// first have to fetch data in chuncks, by giving offset and limit parameter
// give the function call to the comment modal
