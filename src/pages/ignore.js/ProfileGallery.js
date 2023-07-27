import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useSelector } from "react-redux/es/hooks/useSelector";
import NewCommentModal from "../../Components/Commentsection/newCommentModal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const UserGallery = ({ galleryitem }) => {
  console.log(galleryitem);
  let user = useSelector((state) => state.data.user);
  const [openCommentModal, setCommentModal] = useState(false);
  const [commentcount, setcommentcount] = useState(galleryitem.comments.length);
  const [likescount, setlikescount] = useState(galleryitem.likes.length);
  const currentuserinphotolike = galleryitem.likes.find(
    (o) => o.username === `${user.userauth.username}`
  );

  const validatecurrentuserlikedpost = () => {
    if (currentuserinphotolike != undefined) {
      return true;
    } else {
      return false;
    }
  };

  console.log("likes inside gallery" + likescount);

  const setlikescountpreview = (li) => {
    console.log(li);
  };
  return (
    <>
      <div className="gallery-item">
        <LazyLoadImage
          src={galleryitem.image_url}
          alt={galleryitem.caption}
          className="gallery-image"
          // onClick={() => setCommentModal(true)}
          style={{ pointerEvents: "all" }}
        />
        {openCommentModal && (
          <NewCommentModal
            post={galleryitem}
            postimage={galleryitem.image_url}
            // postimage={image}
            // posteduser={postdetails.user.username}
            // dp={postuserdp}
            modalclosed={() => setCommentModal(!openCommentModal)}
            // postid={pid}
            islikedPhoto={validatecurrentuserlikedpost}
            commentscount={setcommentcount}
            likescount={setlikescount}

            // totalLikes={postdetails.likes.length}
          ></NewCommentModal>
        )}
        <div
          className="gallery-item-info"
          onClick={() => setCommentModal(true)}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              // alignContent: "",
            }}
          >
            <div className="gallery-item-likes">
              <FavoriteIcon style={{ marginRight: "5px" }} />
              {/* <span className="visually-hidden">Likes:</span> */}
              {likescount}
            </div>
            <div className="gallery-item-comments">
              <ChatBubbleIcon style={{ marginRight: "5px" }} />
              {commentcount}
              {/* <span className="visually-hidden">Comments:</span>2 */}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="gallery-item">
          <img
            src="https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_640.jpg"
            className="gallery-image"
            alt=""
          />
          <div className="gallery-item-info">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="gallery-item-likes">
                <span className="visually-hidden">Likes:</span>
                56
              </div>
              <div className="gallery-item-comments">
                <span className="visually-hidden">Comments:</span>2
              </div>
            </div>
          </div>
        </div>
        <div className="gallery-item">
          <img
            src="https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_640.jpg"
            className="gallery-image"
            alt=""
          />
          <div className="gallery-item-info">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="gallery-item-likes">
                <span className="visually-hidden">Likes:</span>
                56
              </div>
              <div className="gallery-item-comments">
                <span className="visually-hidden">Comments:</span>2
              </div>
            </div>
          </div>
        </div>
        <div className="gallery-item">
          <img
            src="https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_640.jpg"
            className="gallery-image"
            alt=""
          />
          <div className="gallery-item-info">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="gallery-item-likes">
                <span className="visually-hidden">Likes:</span>
                56
              </div>
              <div className="gallery-item-comments">
                <span className="visually-hidden">Comments:</span>2
              </div>
            </div>
          </div>
        </div> */}
    </>
  );
};

export default UserGallery;
