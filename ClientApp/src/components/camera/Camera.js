import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Container, Row, Col, Button } from "reactstrap";

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
    <Container fluid className="p-2" style={{height: "95%"}}>
      {error ? <h4 className="text-danger">* {error}</h4> : <></>}
      <Row className="d-flex justify-content-center mb-2">
        <Col xs="2" />
        <Col>
          {!imgSrc ? <input onChange={(e) => fileUpload(e)} type="file" /> : <></>}
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
          { !imgSrc ?
            <Webcam
              audio={false}
              ref={webcamRef}
              style={error ? {height : "55vh"} : {height: "63vh"}}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "environment" }}
            />
            : <img src={imgSrc} style={{maxHeight: "65vh"}} alt="Capture" />
          }
          <div className="d-flex justify-content-center mt-2">
            <Col xs="3">
              { !imgSrc ?
                <Button onClick={() => capture()} color="success" style={{height: "4em", width: "8em"}}>Capture</Button>
                : <Button onClick={() => retry()} color="primary" style={{height: "4em", width: "8em"}}>Retry</Button>
              }
            </Col>
          </div>
      </Row>
    </Container>
  );
}
