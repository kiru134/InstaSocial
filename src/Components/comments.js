import { useState } from "react";
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
  let distance = formatDistance(Date.now(), new Date(posted));
  const showNextComments = () => {
    setCommentsSlice(commentsSlice + 2);
  };
  console.log(new Date(posted));
  // console.log(comments[0].user.username);

  return (
    <>
      <div className="commentcontainer">
        {comments.length >= 2 && (
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
        {comments.slice(0, commentsSlice).map((item) => (
          <p key={`${item.text}-${item.user.username}`}>
            <Link
              to={`/profile/${item.user.username}`}
              className="commentedusername"
            >
              <span>{item.user.username}</span>
            </Link>
            <span>{item.text}</span>
          </p>
        ))}
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
        commentInput={commentInput}
      />
    </>
  );
}
