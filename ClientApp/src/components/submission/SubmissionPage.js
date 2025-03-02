import React from "react";
import {
  Card,
  CardBody,
  Container,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import XClose from "../icons/XClose";
import Product from "../product/Product";

/**
 * violation object
 * {
 *      Name
 * }
 *
 */

/**
 * Product object
 * {
 *      Id,
 *      Name,
 *      ImgSrc,
 * }
 */

const violation1 = {
  Name: "OSHA 1913.2",
};

const violation2 = {
  Name: "ANSI 102.5",
};

const Violations = [
  violation1,
  violation2,
  violation1,
  violation2,
  violation1,
  violation2,
];

const product1 = {
  Id: 1,
  Name: "S3700 Pipe Marker Label and Printer Kit with Software",
  ImgSrc: "54272.png",
};

const product2 = {
  Id: 1,
  Name: "S3700 Pipe ",
  ImgSrc: "54272.png",
};

const Products = [
  product1,
  product2,
  product1,
  product2,
  product1,
  product1,
  product1,
  product1,
  product1,
];

export default function SubmissionPage() {
  return (
    <div style={{ height: "94vh" }} className="bg-grey pt-4 px-3">
      <div className="d-flex">
        <div>
          <img src="54272.png" alt="Capture" style={{ maxWidth: "150px" }} />
        </div>
        <Container fluid className="px-3">
          <h2>Detected Violations:</h2>
          <div style={{ maxHeight: "87px", overflowY: "auto" }}>
            <ListGroup>
              {Violations.map((violation) => (
                <ListGroupItem>{violation.Name}</ListGroupItem>
              ))}
            </ListGroup>
          </div>
        </Container>
      </div>
      <div className="d-flex gap-3 mx-3 mt-3">
        <div style={{ fontSize: "24px" }}>Products</div>
        <button className="btn bg-success">
          <div style={{ fontSize: "18px", color: "rgb(228, 227, 227)" }}>
            Add +
          </div>
        </button>
      </div>
      <hr className="mx-3" />
      <div className="px-3" style={{ height: "45%", overflowY: "scroll" }}>
        {Products.map((product) => (
          <Card className="mt-2">
            <CardBody className="d-flex justify-content-between align-items-center gap-2">
              <div>
                <Product product={product} />
              </div>
              <div>
                <XClose size={36} className="mx-4" />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn bg-success mt-4" style={{ width: "90vw" }}>
          <div style={{ fontSize: "18px", color: "rgb(228, 227, 227)" }}>
            Confirm
          </div>
        </button>
      </div>
    </div>
  );
}
