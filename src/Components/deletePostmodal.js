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
const Postdeletemodal = (props) => {
  const modalclasses = useStyles();
  const [modalStyle, setModalStyle] = useState(getModalStyle);
  const [deletebuttonclicked, setdeleteconformModal] = useState(false);
  const handleonclose = () => {
    props.modalclosed(false);
    props.deletestatus(false, null);
  };
  console.log(props.deletemodalopen);
  const handledeletepost = () => {
    setdeleteconformModal(true);
  };

  const getpostdeletedstatus = (status, pid) => {
    if (status === true) {
      props.modalclosed(false);
      props.deletestatus(true, pid);
    }
  };
  const handleconfmodalclose = (event) => {
    setdeleteconformModal(event);
  };
  return (
    <>
      <Modal open={props.deletemodalopen} onClose={handleonclose}>
        <div style={modalStyle} className={modalclasses.paper}>
          <div className="deletemodaloptions">
            <button
              className="deletecommentbuttons"
              style={{ color: "red", fontWeight: "bold" }}
              onClick={handledeletepost}
            >
              Delete
            </button>
            <DeleteConfirmation
              openconfmodal={deletebuttonclicked}
              modalstyles={modalStyle}
              modalclasses={modalclasses}
              modalclosed={handleconfmodalclose}
              BASE_URL={BASE_URL}
              postid={props.post.id}
              currentuser={props.currentuser}
              postdeletedstatus={getpostdeletedstatus}
            />

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
