import React, { useRef } from "react";
import Webcam from "react-webcam";

export default function Camera({ handleCapture }) {
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
        justifyContent: "space-evenly",
      }}
    >
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
