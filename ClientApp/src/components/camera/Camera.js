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
            border: "none",
            padding: "0",
            // If capture photo button appears off screen:
            // position: "absolute",
            // top: "85vh",
            // left: "38%",
          }}
        >
          <CapturePhoto size="64" color="black" />
        </button>
      </div>
    </div>
  );
}
