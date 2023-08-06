// to this first fetch the length of comments from postcard component
// on click of view all comment button modal should open up
// from the add comment component get the latest comment added from the input field
import { useState } from "react";
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
  const prevcomments = postdetails.comments.length;
  // const [commentsSlice, setCommentsSlice] = useState(2);
  const [openCommentModal, setCommentModal] = useState(false);
  const [recentcomment, setrecentcomment] = useState([]);
  const [comlength, comcount] = useState(prevcomments);

  const handleonClick = () => {
    setCommentModal(true);
    setrecentcomment([]);
  };
  console.log(prevcomments);

  console.log(comlength);
  console.log(recentcomment);
  return (
    <>
      <div className="commentcontainer">
        {/* {(Object.keys(recentcomment).length != 0) } */}
        {postdetails.comments.length >= 1 && (
          <button onClick={handleonClick}>
            <p className="viewallcommentscontainer">
              View all{" "}
              {/* {Object.keys(recentcomment).length !== 0
                ? comlength + 1 */}
              {comlength} comments
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
            commentscount={comcount}
            modalclosed={() => setCommentModal(!openCommentModal)}
            // postid={pid}
            islikedPhoto={islikedPhoto}

            // totalLikes={postdetails.likes.length}
          ></NewCommentModal>
        )}
        {!(Object.keys(recentcomment).length === 0) &&
          //   <p key={`${recentcomment[0].timestamp}-${recentcomment[0].user.username}`}>
          recentcomment.map((item) => {
            return (
              <div key={item.id} className="recentcommentitemontimeline">
                <Link
                  to={`/profile/${item.user.username}`}
                  style={{ marginRight: "8px" }}
                >
                  <Avatar
                    alt={item.user.username}
                    style={{
                      width: "20px",
                      height: "20px",
                      marginBottom: "2px",
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

        <AddCommentInput
          docId={postdetails.id}
          comlength={comcount}
          setrecentcomment={setrecentcomment}
          commentInput={commentInput}
        />
      </div>
    </>
  );
}
