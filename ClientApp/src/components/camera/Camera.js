import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Row, Col, Button, Spinner } from "reactstrap";
import { useAuth0 } from '@auth0/auth0-react';

export default function Camera() {
  const webcamRef = useRef();
  const { user } = useAuth0();
  const [imgSrc, setImgSrc] = useState(null);
  const [error, setError] = useState(null);
  const [loadMsg, setLoadMsg] = useState(null);

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
  
  function loadMsgInfo(msg) {
    return (
      <div className="d-flex justify-content-center gap-3">
        <Spinner className="text-brady" />
        <h2>{msg}</h2>
      </div>
    );
  }

  function loadMsgError(msg) {
    return <h2 className="text-danger">*{msg}</h2>
  }

  function loadMsgFinish(msg) {
    return <h2 className="text-success">{msg}</h2>
  }

  function confirm() {
    setLoadMsg(loadMsgInfo("Loading..."));
    setupWs();
  }

  function base64ToArrayBuffer(b64) {
    const binaryString = atob(b64);
    const bytes = new Uint8Array(binaryString.length);
    
    for(let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
  }

  function setupWs() {
    const loc = window.location;
    let uri = loc.protocol === "https:" ? "wss:" : "ws:";
    uri += "//" + loc.host + "/imageapi/upload";

    const ws = new WebSocket(uri);

    ws.onopen = function() {
      const imgArr = imgSrc.split(',');
      const first = user.name.split(' ')[0];
      const obj = { Email: user.email, FirstName: first, LastName: user.family_name, AreaId: 1, ImgTag: imgArr[0] };
      // send meta data
      ws.send(JSON.stringify(obj));

      const data = imgArr[1];
      const binary = base64ToArrayBuffer(data);
      // send image b64
      ws.send(binary);


      ws.send("End of image stream");
    }

    ws.onmessage = function(e) {
      setLoadMsg(loadMsgInfo(e.data));
    }

    ws.onclose = function(e) {
      if(e.reason !== "Successful upload") {
        setLoadMsg(loadMsgError(e.reason.length === 0 ? "An unexpected error occurred" : e.reason));
        return;
      }
      
      setLoadMsg(loadMsgFinish(e.reason));
      // TODO redirect to page to add violations/products
    }

    ws.onerror = function() {
      setLoadMsg(loadMsgError("Error occurred while uploading"));
    }
  }

  if(loadMsg) {
    return (
      <div className="pt-4">
        {loadMsg}
      </div>
    );
  }

  return (
    <div className="p-2" style={{height: "90%"}}>
      {error ? <h4 className="text-danger">* {error}</h4> : <></>}
      <Row className="d-flex justify-content-center mb-2">
        <Col xs="2" />
        <Col>
          {!imgSrc ? <input onChange={(e) => fileUpload(e)} type="file" accept="image/*" /> : <></>}
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
                  <Button onClick={() => confirm()} color="success" style={{height: "4em", widht: "5.5em"}}>Confirm</Button>
                  <Button onClick={() => retry()} color="danger" style={{height: "4em", width: "5.5em"}}>Retry</Button>
                </div>
              )
            }
          </div>
      </div>
    </div>
  );
}
