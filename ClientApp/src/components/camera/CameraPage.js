import React from "react";
import Camera from "./Camera";

export default function CameraPage() {
  function storePhoto(imgText) {
    console.log(imgText);
  }

  return <Camera handleCapture={storePhoto} />;
}
