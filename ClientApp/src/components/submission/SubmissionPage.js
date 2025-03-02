import React, { useState } from "react";
import {
  Card,
  CardBody,
  Container,
  ListGroup,
  ListGroupItem,
  Input,
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

const bradyProducts = [product1, product2];

const detectedProducts = [product1];

export default function SubmissionPage() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addedProducts, setAddedProducts] = useState(detectedProducts);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() !== "") {
      const filtered = bradyProducts
        .filter((product) =>
          product.Name.toLowerCase().includes(value.toLowerCase())
        )
        .filter((product) => !addedProducts.includes(product));
      setSelectedProduct(filtered[0]);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (product) => {
    setQuery(product.Name);
    setSelectedProduct(product);
    setSuggestions([]);
  };

  const handleAdd = () => {
    if (selectedProduct == null) return;
    setQuery("");
    setSuggestions([]);
    setSelectedProduct(null);
    setAddedProducts([...addedProducts, selectedProduct]);
  };

  const handleRemove = (product) => {
    const index = addedProducts.indexOf(product);
    if (index > -1) {
      addedProducts.splice(index, 1);
    }
    setAddedProducts([...addedProducts]);
  };

  return (
    <div style={{ height: "94vh" }} className="bg-grey pt-4 px-3">
      <div className="d-flex">
        <div>
          <img src="54272.png" alt="Uploaded" style={{ maxWidth: "150px" }} />
        </div>
        <Container fluid className="px-3">
          <h2>Violations Found:</h2>
          <div style={{ maxHeight: "95px", overflowY: "auto" }}>
            <ListGroup>
              {Violations.map((violation, i) => (
                <ListGroupItem key={i}>{violation.Name}</ListGroupItem>
              ))}
            </ListGroup>
          </div>
        </Container>
      </div>
      <div className="d-flex gap-3 mx-3 mt-3">
        <div className="position-relative w-100">
          <Input
            onKeyUp={(e) => {
              if (e.key === "Enter") handleAdd();
            }}
            type="text"
            placeholder="Search Brady..."
            value={query}
            onChange={handleChange}
            bsSize="lg"
            onBlur={() => setTimeout(() => setSuggestions([]), 100)}
          />
          {suggestions.length > 0 && (
            <ListGroup
              className="position-absolute w-100 bg-white border shadow"
              style={{
                maxHeight: "245px",
                overflowY: "auto",
                zIndex: 10,
              }}
            >
              {suggestions.map((product, i) => (
                <ListGroupItem
                  key={i}
                  onClick={() => handleSelect(product)}
                  className="cursor-pointer"
                >
                  {product.Name}
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </div>
        <button className="btn bg-success" onClick={handleAdd}>
          <div
            className="d-flex align-items-center gap-2 px-2"
            style={{ fontSize: "18px", color: "rgb(228, 227, 227)" }}
          >
            +
          </div>
        </button>
      </div>
      <hr className="mx-3" />
      <div className="px-3" style={{ height: "45%", overflowY: "scroll" }}>
        {addedProducts.map((product, i) => (
          <Card className="mt-2" key={i}>
            <CardBody className="d-flex justify-content-between align-items-center gap-2">
              <div>
                <Product product={product} />
              </div>
              <button className="btn" onClick={() => handleRemove(product)}>
                <XClose size={36} className="mx-4" />
              </button>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn bg-primary mt-4" style={{ width: "90vw" }}>
          <div style={{ fontSize: "18px", color: "rgb(228, 227, 227)" }}>
            Confirm
          </div>
        </button>
      </div>
    </div>
  );
}
