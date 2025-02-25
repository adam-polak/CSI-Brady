import React, { useRef } from "react";
import Webcam from "react-webcam";
import CapturePhoto from "../icons/CapturePhoto";

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
        justifyContent: "space-between",
      }}
    >
      <Webcam
        audio={false}
        ref={webcamRef}
        width={window.innerWidth}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "environment" }}
      />
      <div className="text-center">
        <button
          onClick={capture}
          style={{
            background: "none",
            color: "inherit",
            border: "none",
            padding: "0",
            font: "inherit",
            cursor: "pointer",
            outline: "inherit",
          }}
        >
          <CapturePhoto size="64" color="black" />
        </button>
      </div>
    </div>
  );
}
