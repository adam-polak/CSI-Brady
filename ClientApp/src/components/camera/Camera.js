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
        // style={{height: "100vh", width: "100vw"}}
        width={window.innerWidth}
        height={window.innerHeight}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "environment" }}
      />
      <div>
        <button
          onClick={capture}
          style={{
            background: "none",
            border: "none",
            padding: "0",
            position: "absolute",
            top: "85%",
            left: "50%",
            transform: "translateX(-50%)",

          }}
        >
          <CapturePhoto size="64" color="black" />
        </button>
      </div>
    </div>
  );
}
