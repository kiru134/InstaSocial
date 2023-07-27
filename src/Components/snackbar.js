import { Snackbar } from "@mui/material";
import React, { useState } from "react";
const Snackbarcomp = ({ openmodal, message }) => {
  const [open, setopen] = useState(openmodal);
  console.log("inside snackbar status effect");
  const handleclose = () => {
    setopen(!open);
  };
  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      sx={{ position: "absolute" }}
      onClose={handleclose}
      autoHideDuration={1500}
      message={message}
    />
  );
};
export default Snackbarcomp;
