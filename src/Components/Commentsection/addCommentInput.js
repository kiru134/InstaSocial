import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import useHttp from "../../Hooks/usehttphook";
import "../comment.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function AddCommentInput({
  docId,
  comlength,
  setrecentcomment,
  commentInput,
  addnewcomments,
}) {
  const [comment, setComment] = useState("");
  const { isLoading, error, sendRequest: updatecomments } = useHttp();
  let userr = useSelector((state) => state.data.user);

  console.log(setrecentcomment);
  const commentsetter = (data) => {
    console.log(data);
    let timestamp = data.timestamp;
    let user = userr.userauth;
    let text = data.text;
    let likes = [];
    let id = data.id;
    comlength((prev) => prev + 1);
    setrecentcomment((prev) => [...prev, { text, user, timestamp, likes, id }]);
    addnewcomments(true);
    // console.log(addnewcomments);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    const json_string = JSON.stringify({
      user_id: userr.userauth.userId,
      text: comment,
      post_id: docId,
    });
    updatecomments(
      {
        url: BASE_URL + "comment/add",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json_string,
      },
      commentsetter
    );
    setComment("");
  };
  return (
    <div className="addpostcontainer">
      <form
        className="addpostcontainer_container_form"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          type="text"
          name="add-comment"
          placeholder="Add a comment...."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className="addcommentbutton"
          // {!comment && style={{opacity: 0.25}}}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}
