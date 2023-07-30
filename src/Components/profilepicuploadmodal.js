import { Modal, makeStyles } from "@material-ui/core";
import { useState, useRef } from "react";
import { storage } from "../FirebaseProfilepicture/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../pages/userprofiledit.css";
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

    width: 350,
    height: 250,
    borderRadius: "12px",
    boxShadow: theme.shadows[5],
    border: "0px",

    // padding: theme.spacing(2, 4, 3)
  },
}));

const Profileuploadmodal = ({ modalclose, setuploadedpic }) => {
  const modalclasses = useStyles();
  const [modalStyle, setModalStyle] = useState(getModalStyle);
  const [openModal, setOpenModal] = useState(true);

  const filepickerRef = useRef(null);

  const handleonclose = () => {
    setOpenModal(!openModal);
    modalclose(true);
  };

  const addUserAvatar = (e) => {
    if (e.target.files[0]) {
      addImagetofirebase(e.target.files[0]);
    }
  };
  const addImagetofirebase = (image) => {
    console.log(image);
    const imageRef = ref(storage, "image");
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            // setUploadedAvatar(url);
            setuploadedpic(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
    // console.log("uploadedAvatar=" + uploadedAvatar);
    // reader.readAsDataURL(e.target.files[0]);
    // reader.onload = (readerEvent) => {
    //   setUserAvatar(readerEvent.target.result);
    // };
  };
  const removeprofilephoto = () => {
    setuploadedpic(null);
  };
  return (
    <>
      <Modal open={openModal} onClose={handleonclose}>
        <div style={modalStyle} className={modalclasses.paper}>
          <div className="modaltitle">
            <span>Change profile photo</span>
          </div>
          <button
            className="modaleoptionbutton"
            style={{ color: "DeepSkyBlue", fontWeight: 400 }}
            onClick={() => filepickerRef.current.click()}
          >
            Upload Photo
          </button>
          <input
            style={{ display: "none" }}
            onChange={addUserAvatar}
            ref={filepickerRef}
            type="file"
            hidden
          />

          <button
            className="modaleoptionbutton"
            style={{ color: "red", fontWeight: 700 }}
            onClick={removeprofilephoto}
          >
            Remove current photo
          </button>
          <button className="modaleoptionbutton" onClick={handleonclose}>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};
export default Profileuploadmodal;
