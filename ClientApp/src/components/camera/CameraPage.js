import React from "react";
import Camera from "./Camera";
import { useNavigate, useParams } from "react-router-dom";
import ArrowLeft from "../icons/Arrow";

export default function CameraPage() {
  const { facilityId, facilityAddress, companyName } = useParams();
  const nav = useNavigate();

  function storePhoto(imgText) {
    console.log(imgText);
  }

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <button
        className="dashboard-btn btn text-white"
        onClick={() => {console.log("test"); nav(`/dashboard/${facilityId}/${facilityAddress}/${companyName}`)}}
        style={{ position: "absolute", zIndex: "1" }}
      >
        <ArrowLeft size="48" color="white" />
      </button>
      <Camera handleCapture={storePhoto} />
    </div>
  );
}
