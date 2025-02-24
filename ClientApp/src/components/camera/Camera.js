import React, { useRef } from "react";
import Webcam from "react-webcam";

export default function Camera({ handleCapture }) {
  const webcamRef = useRef();

  function capture() {
    const imageSrc = webcamRef.current.getScreenshot();
    handleCapture(imageSrc);
  }

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        width={window.innerWidth}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "environment" }}
      />
      <button onClick={capture}>Capture Photo</button>
    </div>
  );
}
