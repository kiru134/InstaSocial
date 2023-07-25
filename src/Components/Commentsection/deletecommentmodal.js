import { Modal, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import useHttp from "../../Hooks/usehttphook";

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
    height: 100,
    borderRadius: "12px",
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 0, 3),
  },
}));
const BASE_URL = "https://ig-clone-api-production.up.railway.app/";
const Commentdeletemodal = ({ modalclosed, cid, deletedcommentid }) => {
  const modalclasses = useStyles();
  const [modalStyle, setModalStyle] = useState(getModalStyle);
  const [openModal, setOpenModal] = useState(true);
  const { isLoading, error, sendRequest: deletecomment } = useHttp();

  const handleonclose = () => {
    setOpenModal(!openModal);
    modalclosed(true);
  };
  const deletestatus = (data) => {
    if (data.success === true) {
      console.log("inside function");
      deletedcommentid(cid);
      setOpenModal(!openModal);
      modalclosed(true);
    }
    console.log(data.success);
  };
  const handledeletecomment = async () => {
    const json_string = JSON.stringify({
      id: cid,
    });
    await deletecomment(
      {
        url: BASE_URL + "comment/delete",
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: json_string,
      },
      deletestatus
    );
  };
  return (
    <>
      <Modal open={openModal} onClose={handleonclose}>
        <div style={modalStyle} className={modalclasses.paper}>
          <div className="deletemodaloptions">
            <button
              className="deletecommentbuttons"
              style={{ color: "red", fontWeight: "bold" }}
              onClick={handledeletecomment}
            >
              Delete
            </button>
            <button className="deletecommentbuttons" onClick={handleonclose}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* */}
    </>
  );
};

export default Commentdeletemodal;
