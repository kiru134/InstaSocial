import { Modal, makeStyles } from "@material-ui/core";
import React, { useState } from "react";

import DeleteConfirmation from "./deletepostConfirmationmodal";

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
    height: 150,
    borderRadius: "12px",
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 0, 3),
  },
}));
const BASE_URL = "https://ig-clone-api-production.up.railway.app/";
const Postdeletemodal = ({ modalclosed, post, currentuser }) => {
  const modalclasses = useStyles();
  const [modalStyle, setModalStyle] = useState(getModalStyle);
  const [openModal, setOpenModal] = useState(true);
  const [deletebuttonclicked, setdeleteconformModal] = useState(false);
  const handleonclose = () => {
    setOpenModal(!openModal);
    modalclosed(true);
  };

  const handledeletepost = () => {
    setdeleteconformModal(true);
    // setOpenModal(!openModal);
    // modalclosed(true);
  };
  return (
    <>
      <Modal open={openModal} onClose={handleonclose}>
        <div style={modalStyle} className={modalclasses.paper}>
          <div className="deletemodaloptions">
            <button
              className="deletecommentbuttons"
              style={{ color: "red", fontWeight: "bold" }}
              onClick={handledeletepost}
            >
              Delete
            </button>
            {deletebuttonclicked && (
              <DeleteConfirmation
                modalstyles={modalStyle}
                modalclasses={modalclasses}
                modalclosed={() => setdeleteconformModal(!deletebuttonclicked)}
                BASE_URL={BASE_URL}
                postid={post.id}
                currentuser={currentuser}
              />
            )}
            <button className="deletecommentbuttons" onClick={handleonclose}>
              Hide Likes on Post?
            </button>
            <button className="deletecommentbuttons" onClick={handleonclose}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Postdeletemodal;
