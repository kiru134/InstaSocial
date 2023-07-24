import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useSelector } from "react-redux/es/hooks/useSelector";
import NewCommentModal from "../../Components/Commentsection/newCommentModal";
import { useState } from "react";
import { Link } from "react-router-dom";
const UserGallery = ({ galleryitem }) => {
  console.log(galleryitem);
  let user = useSelector((state) => state.data.user);
  const [openCommentModal, setCommentModal] = useState(false);
  const currentuserinphotolike = galleryitem.likes.find(
    (o) => o.username === `${user.userauth.username}`
  );
  function imageClick() {
    console.log("imageclicked");
  }

  const validatecurrentuserlikedpost = () => {
    if (currentuserinphotolike != undefined) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="gallery-item">
        <img
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
              {galleryitem.likes.length}
            </div>
            <div className="gallery-item-comments">
              <ChatBubbleIcon style={{ marginRight: "5px" }} />
              {galleryitem.comments.length}
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
