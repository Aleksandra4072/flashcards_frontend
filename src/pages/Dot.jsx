import { useState, useRef } from "react";

import { Button, TextField } from "@mui/material";
import { Dialog, DialogContent, DialogActions, DialogTitle } from "@mui/material";

import axios from "../api/axios";

const Dot = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");
  const [coord, setCoord] = useState({ left: "", top: "" });
  const imageRef = useRef(null);

  const inputFields = [
    { label: "Left", val: "left" },
    { label: "Top", val: "top" },
  ];

  const openDialog = () => {
    setOpen(true);
    axios.get("/download_file/random.jpg", { responseType: "blob" }).then((res) => setFile(res.data));
  };

  const handleClick = (e) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Convert screen coordinates to image coordinates
      const img = imageRef.current;
      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;

      const left = Math.round(x * scaleX);
      const top = Math.round(y * scaleY);

      setCoord({ left: Math.max(0, left), top });
    }
    console.log(coord);
  };

  return (
    <div>
      <Button variant="contained" onClick={() => openDialog()}>
        Set Coordinates
      </Button>
      <Dialog maxWidth="md" open={open}>
        <DialogTitle>Set Image Coordinates</DialogTitle>
        <DialogContent sx={{ display: "flex" }}>
          <div style={{ width: "30%" }}>
            {inputFields.map((obj, idx) => (
              <TextField key={idx} label={obj.label} variant="standard" id={obj.val} value={coord[obj.val]} />
            ))}
          </div>
          <div style={{ position: "relative", width: "70%" }}>
            {file && (
              <img
                ref={imageRef}
                src={URL.createObjectURL(file)}
                style={{ maxWidth: "100%", display: "block", left: 0, top: 0, cursor: "crosshair" }}
                onClick={handleClick}
              />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setCoord({ left: "", top: "" });
            }}
          >
            Cancel
          </Button>
          <Button variant="contained">Set</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dot;
