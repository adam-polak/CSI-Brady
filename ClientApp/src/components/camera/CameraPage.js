import React from "react";
import Camera from "./Camera";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "../icons/Arrow";

export default function CameraPage() {
  const nav = useNavigate();

  function storePhoto(imgText) {
    console.log(imgText);
  }

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <button
        className="dashboard-btn btn text-white"
        onClick={() => nav("/dashboard")}
        style={{ position: "absolute" }}
      >
        <ArrowLeft size="48" color="white" />
      </button>
      <Camera handleCapture={storePhoto} />
    </div>
  );
}
