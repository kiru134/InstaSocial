import { Cancel } from "@mui/icons-material";
import CropIcon from "@mui/icons-material/Crop";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";

const CropEasy = ({ photoURL, setOpenCrop, setPhotoaftercrop }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [opendialog, setOpendialog] = useState(true);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    try {
      const url = await getCroppedImg(photoURL, croppedAreaPixels, rotation);
      setPhotoaftercrop(url);
      console.log(url);
      setOpenCrop(false);
    } catch (error) {
      //   setAlert({
      //     isAlert: true,
      //     severity: "error",
      //     message: error.message,
      //     timeout: 5000,
      //     location: "modal",
      //   });
      console.log(error.message);
    }
  };

  const handleclose = () => {
    setOpendialog(!opendialog);
  };
  return (
    <>
      <Dialog
        disableEnforceFocus
        open={opendialog}
        onClose={handleclose}
        sc={{ display: "flex", position: "fixed", flexDirection: "column" }}
      >
        <DialogContent
          dividers
          sx={{
            background: "gray",
            position: "relative",
            height: 400,
            width: "auto",
            // top: "-28%",
            // right: "-10%",

            minWidth: { sm: 500 },
          }}
        >
          <Cropper
            image={photoURL}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={3.2 / 4}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropChange={setCrop}
            onCropComplete={cropComplete}
          />
        </DialogContent>
        <DialogActions
          sx={{ flexDirection: "column", mx: 3, my: 2, position: "relative" }}
        >
          <Box sx={{ width: "100%", mb: 1 }}>
            <Box>
              <Typography>Zoom:{zoomPercent(zoom)}</Typography>
              <Slider
                valueLabelDisplay="auto"
                // valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                valueLabelFormat={zoomPercent}
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </Box>
            <Box>
              <Typography>Rotation: {rotation + "°"}</Typography>
              <Slider
                valueLabelDisplay="auto"
                min={0}
                max={360}
                value={rotation}
                onChange={(e, rotation) => setRotation(rotation)}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={() => setOpenCrop(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<CropIcon />}
              onClick={cropImage}
            >
              Crop
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CropEasy;

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};
