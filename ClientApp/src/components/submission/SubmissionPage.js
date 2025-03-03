import React, { Component } from "react";
import {
  Card,
  CardBody,
  Container,
  ListGroup,
  ListGroupItem,
  Input,
  Button,
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import XClose from "../icons/XClose";
import Product from "../product/Product";
import { LoadingSpinner } from "../loading/Loading";
import NavHeader from "../header/NavHeader";

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

export function SubmissionPageWrapper() {
  const { areaId, imageId } = useParams();
  const nav = useNavigate();

  return <SubmissionPage nav={nav} areaId={areaId} imageId={imageId} />;
}

export class SubmissionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgSrc: "",
      query: "",
      violations: [],
      suggestions: [],
      bradyProducts: [],
      selectedProduct: null,
      addedProducts: [],
      violationsLoading: true,
      productsLoading: true,
    };
  }

  componentDidMount() {
    this.loadImgSrc();
    this.loadViolations();
    this.loadImageProducts();
    this.loadProducts();
  }

  async loadImgSrc() {
    const { areaId, imageId } = this.props;
    const result = await fetch(`/imageapi/image/${areaId}/${imageId}`);
    const imgSrc = await result.text();
    this.setState({ imgSrc: imgSrc });
  }

  async loadProducts() {
    const result = await fetch("/productapi/products");
    const products = JSON.parse(await result.text());
    this.setState({ bradyProducts: products });
  }

  async loadViolations() {
    const { imageId } = this.props;
    const result = await fetch("/imageapi/violations/" + imageId);
    const violations = JSON.parse(await result.text());
    this.setState({ violations: violations, violationsLoading: false });
  }

  async loadImageProducts() {
    const { imageId } = this.props;
    const result = await fetch("/imageapi/products/" + imageId);
    const products = JSON.parse(await result.text());
    this.setState({ addedProducts: products, productsLoading: false });
  }

  render() {
    const { nav, areaId, imageId } = this.props;
    const {
      imgSrc,
      query,
      bradyProducts,
      violations,
      suggestions,
      selectedProduct,
      addedProducts,
      violationsLoading,
      productsLoading,
    } = this.state;

    const handleChange = (e) => {
      const value = e.target.value;
      this.setState({ query: value });
      if (value.trim() !== "") {
        const filtered = bradyProducts
          .filter((product) =>
            product.Name.toLowerCase().includes(value.toLowerCase())
          )
          .filter((product) => !addedProducts.includes(product));
        this.setState({ selectedProduct: filtered[0], suggestions: filtered });
      } else {
        this.setState({ suggestions: [] });
      }
    };

    const handleSelect = (product) => {
      this.setState({
        query: product.Name,
        selectedProduct: product,
        suggestions: [],
      });
      handleAdd();
    };

    const handleAdd = () => {
      if (selectedProduct == null) return;
      this.setState({
        query: "",
        suggestions: [],
        selectedProduct: null,
        addedProducts: [...addedProducts, selectedProduct],
      });
    };

    const handleRemove = (product) => {
      const index = addedProducts.indexOf(product);
      if (index > -1) {
        addedProducts.splice(index, 1);
      }

      this.setState({ addedProducts: [...addedProducts] });
    };

    async function confirm() {
      await fetch(`/imageapi/setproducts/${areaId}/${imageId}`, {
        method: "POST",
        body: JSON.stringify(addedProducts.map((p) => p.Id)),
      });

      nav(-2); // Go back to area page
    }

    function addNote() {}

    return (
      <div style={{ height: "94vh" }} className="bg-grey">
        <NavHeader />
        <div className="d-flex py-3 px-3">
          <div>
            <img src={imgSrc} alt="Uploaded" style={{ maxWidth: "150px" }} />
          </div>
          <Container className="px-3">
            {violations.length !== 0 && <h2>Violations Found:</h2>}
            {violations.length === 0 && !violationsLoading && (
              <h2>* No violations detected</h2>
            )}
            {violationsLoading && <LoadingSpinner />}
            <div style={{ maxHeight: "95px", overflowY: "auto" }}>
              <ListGroup>
                {violations.map((violation, i) => (
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
              onBlur={() =>
                setTimeout(() => this.setState({ suggestions: [] }), 100)
              }
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
        <div className="px-3" style={{ height: "35%", overflowY: "scroll" }}>
          {productsLoading && <LoadingSpinner />}
          {addedProducts.length === 0 && !productsLoading && (
            <h2 className="text-center">* No products added</h2>
          )}
          {addedProducts.map((product, i) => (
            <Card className="mt-2" key={i}>
              <CardBody className="position-relative">
                <div className="position-absolute top-0 end-0 p-2">
                  <button
                    className="btn p-0"
                    onClick={() => handleRemove(product)}
                  >
                    <XClose size={36} />
                  </button>
                </div>
                <div className="d-flex align-items-center pe-4">
                  <button
                    onClick={() => addNote()}
                    color="primary"
                    className="btn"
                  >
                    <img
                      width="40px"
                      height="40px"
                      alt="add note"
                      src="add-note.svg"
                    />
                  </button>
                  <Product product={product} />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
        <div className="d-flex justify-content-center text-white">
          <Button
            onClick={() => confirm()}
            color="primary"
            className="text-white mt-4"
            style={{ width: "90vw" }}
          >
            <div style={{ fontSize: "18px", color: "rgb(228, 227, 227)" }}>
              Confirm
            </div>
          </Button>
        </div>
      </div>
    );
  }
}
