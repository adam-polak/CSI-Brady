import React from "react";
import { Col, Row } from "reactstrap";

/**
 * Product object
 * {
 *      Id,
 *      Name,
 *      ImgSrc,
 *      Link,
 *      Violations[]
 * }
 */

/**
 * Violation object
 * {
 *      Name,
 *      Link,
 *      Summary
 * }
 */

export default function Product({ product }) {
  return (
    <Row className="align-items-center">
      <Col xs="auto">
        <img
          alt="Product"
          src={product.ImgSrc}
          className="img-fluid"
          style={{ maxHeight: "100px", width: "auto" }}
        />
      </Col>
      <Col>
        <a
          href={product.Link}
          target="_blank"
          rel="noreferrer"
        >
          <h3>{product.Name}</h3>
        </a>
      </Col>
    </Row>
  );
}
