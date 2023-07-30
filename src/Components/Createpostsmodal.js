import { Button, Modal, Typography, makeStyles } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./creatpostmodal.css";
import CropEasy from "../utlis/CropEasy";
import { Snackbar } from "@mui/material";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { storage } from "../FirebaseProfilepicture/Firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import useHttp from "../Hooks/usehttphook";

const BASE_URL = "https://ig-clone-api-production.up.railway.app/";

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
    height: "70%",
    // width: "30%",
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 4, 3),
  },
}));

const CreatePost = ({ modalclosed }) => {
  const modalclasses = useStyles();
  const [modalStyle, setModalStyle] = useState(getModalStyle);
  const [openModal, setOpenModal] = useState(true);
  const [postfinalcroppeImage, setUploadedPostImage] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [OpenCrop, setOpenCrop] = useState(false);
  const [caption, setCaption] = useState("");
  const [photoaftercrop, setPhotoaftercrop] = useState("");
  const filepickerRef = useRef(null);
  const { isLoading, error, sendRequest: uploadpost } = useHttp();
  const [displaySnackbar, setsnackbar] = useState(false);

  let user = useSelector((state) => state.data.user);

  const handleonclose = () => {
    setOpenModal(!openModal);
    modalclosed(true);
  };

  const handleSnackbarClose = () => {
    setsnackbar(!displaySnackbar);
    setOpenModal(!openModal);
    modalclosed(true);
  };

  const uploadinputImageforcrop = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function (e) {
        setPhotoURL(reader.result);
        setOpenCrop(!OpenCrop);
        console.log(OpenCrop);
      };
    }
  };

  // console.log(photoURL);
  console.log(OpenCrop);
  const handlefinalimagesubmit = () => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const imageRef = ref(
      storage,
      `/Posts/${timestamp}+${user.userauth.username}.jpeg`
    );
    // console.log(
    //   putString(base64str.split(",")[1], "base64", {
    //     contentType: "image/jpeg",
    //   })
    // );

    // console.log(
    //   URL.createObjectURL(`data:image/jpeg;base64,${photoaftercrop}`)
    // );
    uploadString(imageRef, photoaftercrop, "data_url")
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUploadedPostImage(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
    // write the code to upload on firebase and finally call the api to upload in the backend,increase the count of the post on the profile
  };
  const uploadpostonprofile = (data) => {
    if (data) {
      setsnackbar(true);
    }
  };
  useEffect(() => {
    if (postfinalcroppeImage !== "") {
      let postbody = JSON.stringify({
        image_url: postfinalcroppeImage,
        image_url_type: "absolute",
        caption: caption,
        creator_id: user.userauth.userId,
      });
      const uploadingposts = async () => {
        await uploadpost(
          {
            url: BASE_URL + "post",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: postbody,
          },
          uploadpostonprofile
        );
      };
      uploadingposts();
    }
  }, [postfinalcroppeImage]);

  console.log(postfinalcroppeImage);

  return ReactDOM.createPortal(
    <>
      <Modal open={openModal} onClose={handleonclose}>
        <div style={modalStyle} className={modalclasses.paper}>
          <div
            style={{
              height: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {photoaftercrop && (
              <div
                className="create-post__image"
                onClick={() => filepickerRef.current.click()}
              >
                <div>
                  <img src={photoaftercrop} alt="post-content" />
                </div>
              </div>
            )}
            {!photoaftercrop && (
              <div
                onClick={() => filepickerRef.current.click()}
                className="create-post__image-picker"
              >
                <svg
                  aria-label="Icon to represent media such as images or videos"
                  className="_8-yf5 "
                  color="#262626"
                  fill="#262626"
                  height="77"
                  role="img"
                  viewBox="0 0 97.6 77.3"
                  width="96"
                >
                  <path
                    d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                    fill="currentColor"
                  ></path>
                </svg>
                <p>Upload photos and videos here</p>
              </div>
            )}
            <input
              style={{ display: "none" }}
              onChange={uploadinputImageforcrop}
              ref={filepickerRef}
              type="file"
              hidden
            />
          </div>
          <div>
            <input
              accept="image/*"
              id="captionbox"
              aria-label="Add Caption"
              autoComplete="off"
              type="text"
              name="add-caption"
              placeholder="Give a caption to the post...."
              value={caption}
              onChange={({ target }) => setCaption(target.value)}
            />

            <button
              className="create-post__upload"
              type="submit"
              disabled={photoaftercrop === ""}
              onClick={handlefinalimagesubmit}
            >
              {/* onClick={uploadPost} */}
              Upload
            </button>
          </div>

          {OpenCrop && (
            <CropEasy {...{ photoURL, setOpenCrop, setPhotoaftercrop }} />
          )}
          {/* {inputimageforcrop && </>} */}
          <Snackbar
            open={displaySnackbar}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            onClose={handleSnackbarClose}
            autoHideDuration={1500}
            message={error === null ? "Post Uploaded successfully" : error}
          />
        </div>
      </Modal>
    </>,
    document.getElementById("portal")
  );
};

export default CreatePost;
