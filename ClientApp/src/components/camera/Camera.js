import React, { useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function Camera({ handleCapture }) {
  const nav = useNavigate();
  const webcamRef = useRef();

  function capture() {
    const imageSrc = webcamRef.current.getScreenshot();
    handleCapture(imageSrc);
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Button onClick={() => nav("/dashboard")}>Back</Button>
      <div>
        <Webcam
          audio={false}
          ref={webcamRef}
          width={window.innerWidth}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "environment" }}
        />
      </div>
      <button onClick={capture}>Capture Photo</button>
    </div>
  );
}
