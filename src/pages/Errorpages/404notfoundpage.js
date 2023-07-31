import React, { useState, useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  let user = useSelector((state) => state.data.user);
  const [buttoname, setbutton] = useState("");
  console.log(user);
  const navigate = useNavigate();
  const handleclick = () => {
    if (buttoname == "Back Home") {
      navigate("/Homepage");
    }
    if (buttoname == "Back to Login") {
      navigate("/");
    }
  };
  useEffect(() => {
    if (user.userauth.authToken != undefined) {
      setbutton("Back Home");
    } else {
      setbutton("Back to Login");
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button onClick={handleclick} variant="contained">
              {buttoname}
            </Button>
          </Grid>
          <Grid xs={6}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width={500}
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NotFound;
