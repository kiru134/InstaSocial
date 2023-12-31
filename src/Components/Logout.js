import React, { useState, useEffect } from "react";
import { Button, Modal, Typography, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/UserSlice";

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
    width: 200,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Logout = ({ modalclosed }) => {
  const modalclasses = useStyles();
  const [modalStyle, setModalStyle] = useState(getModalStyle);
  const [openModal, setOpenModal] = useState(true);
  const dispatch = useDispatch();
  console.log("openModal" + openModal);

  const handleOKClick = () => {
    dispatch(
      logoutUser({
        authToken: null,
        authTokenType: "",
        username: "",
        userId: "",
      })
    );
    console.log("dispatched action");
    console.log("removed localstorage");
    setOpenModal(!openModal);
    modalclosed(true);
  };

  const handleCancelClick = () => {
    setOpenModal(false);
    modalclosed(true);
  };
  const handleonclose = () => {
    setOpenModal(!openModal);
    modalclosed(true);
  };
  return (
    <React.Fragment>
      {/* <ModalOverlay
         logOutClicked=
        > */}
      <div>
        <Modal open={openModal} onClose={handleonclose}>
          <div style={modalStyle} className={modalclasses.paper}>
            <Typography> Do you want to log out ? </Typography>
            <Button
              style={{
                paddingRight: "10px",
                height: "30px",
              }}
              onClick={handleOKClick}
            >
              OK
            </Button>
            <Button
              style={{
                paddingLeft: "10px",
                backgroundColor: "#0095f6",
                height: "30px",
                color: "white",
                marginTop: "5px",
              }}
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default Logout;
