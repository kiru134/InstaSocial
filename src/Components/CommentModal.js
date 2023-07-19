import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button, Modal, Typography, makeStyles } from "@material-ui/core";

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

const CommentModal = ({ postimage, posteduser, dp, modalclosed }) => {
  const modalclasses = useStyles();
  const [modalStyle, setModalStyle] = useState(getModalStyle);
  const [openModal, setOpenModal] = useState(true);
  console.log("inside modal");
  //   console.log(modal);
  const handleonclose = () => {
    setOpenModal(!openModal);
    modalclosed(true);
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
            <div className="modalcontainerpartitioner_right"></div>
          </div>
        </div>
      </Modal>
    </>,
    document.getElementById("portal")
  );
};

export default CommentModal;
