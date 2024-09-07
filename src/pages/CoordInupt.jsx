import { useState, useRef } from "react";

import { Button, TextField } from "@mui/material";
import { Dialog, DialogContent, DialogActions, DialogTitle } from "@mui/material";

import axios from "../api/axios";

const CoordInput = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");

  const [selecting, setSelecting] = useState(false);
  const [coord, setCoord] = useState({ left: "", top: "", right: "", bottom: "" });
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [rect, setRect] = useState(null);
  const imageRef = useRef(null);

  const inputFields = [
    { label: "Left", val: "left" },
    { label: "Top", val: "top" },
    { label: "Right", val: "right" },
    { label: "Bottom", val: "bottom" },
  ];

  const openDialog = () => {
    setOpen(true);
    axios.get("/download_file/random.jpg", { responseType: "blob" }).then((res) => setFile(res.data));
  };

  const handleMouseDown = (e) => {
    setSelecting(true);
    const rect = imageRef.current.getBoundingClientRect();
    setStartPoint({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (selecting && startPoint) {
      const rect = imageRef.current.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      setRect({
        x: Math.min(startPoint.x, currentX),
        y: Math.min(startPoint.y, currentY),
        width: Math.abs(currentX - startPoint.x),
        height: Math.abs(currentY - startPoint.y),
      });
    }
  };

  const handleMouseUp = () => {
    setSelecting(false);
    if (rect && imageRef.current) {
      const img = imageRef.current;
      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;

      // Convert screen coordinates to image coordinates
      const left = Math.round(rect.x * scaleX);
      const top = Math.round(rect.y * scaleY);

      setCoord({
        left: Math.max(0, left),
        top: top,
        right: left + Math.round(rect.width * scaleX),
        bottom: top + Math.round(rect.height * scaleY),
      });
    }
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
            {file && <img ref={imageRef} src={URL.createObjectURL(file)} style={{ maxWidth: "100%", display: "block" }} />}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                cursor: "crosshair",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              {rect && (
                <div
                  style={{
                    position: "absolute",
                    border: "1px solid blue",
                    backgroundColor: "rgba(0, 0, 255, 0.2)",
                    left: rect.x,
                    top: rect.y,
                    width: rect.width,
                    height: rect.height,
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpen(false);
            setCoord({ left: "", top: "", right: "", bottom: "" });
            setRect(null);
            }}>Cancel</Button>
          <Button variant="contained">Set</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CoordInput;
