import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Row, Col, Button } from "reactstrap";

export default function Camera() {
  const webcamRef = useRef();
  const [imgSrc, setImgSrc] = useState(null);
  const [error, setError] = useState(null);

// 10mb = 100,000,000 bytes, images must be <= this size
const maxImageSize = 100000000;

  function capture() {
    setImgSrc(webcamRef.current.getScreenshot());
  }

  function fileUpload(e) {
    const file = e.target.files[0];
    if(imgSrc || !file || file.size > maxImageSize) {
      setError("Image too large")
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const base64String = e.target.result;
      setImgSrc(base64String);
    }

    reader.onerror = (err) => {
      setError(err);
    }

    reader.readAsDataURL(file);

    setImgSrc(file.name);
  }

  function retry() {
    setError(null);
    setImgSrc(null);
  }

  return (
    <div className="p-2" style={{height: "90%"}}>
      {error ? <h4 className="text-danger">* {error}</h4> : <></>}
      <Row className="d-flex justify-content-center mb-2">
        <Col xs="2" />
        <Col>
          {!imgSrc ? <input onChange={(e) => fileUpload(e)} type="file" /> : <></>}
        </Col>
      </Row>
      <div className="d-flex flex-column justify-content-center" style={{height: "20%"}}>
          { !imgSrc ?
            <Webcam
              audio={false}
              ref={webcamRef}
              style={error ? {maxHeight: "55vh", maxWidth: "85vw"} : {maxHeight: "60vh", maxWidth: "85vw"}}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "environment" }}
            />
            : <img src={imgSrc} style={{maxHeight: "65vh", maxWidth: "85vw"}} alt="Capture" />
          }
          <div className="mt-3 d-flex justify-content-center">
            { !imgSrc ?
              <Button onClick={() => capture()} color="primary" style={{height: "4em", width: "8em"}}>Capture</Button>
              : (
                <div className="d-flex gap-3">
                  <Button onClick={() => retry()} color="success" style={{height: "4em", widht: "6em"}}>Confirm</Button>
                  <Button onClick={() => retry()} color="danger" style={{height: "4em", width: "6em"}}>Retry</Button>
                </div>
              )
            }
          </div>
      </div>
    </div>
  );
}
