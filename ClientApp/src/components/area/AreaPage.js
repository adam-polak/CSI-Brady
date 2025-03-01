import React, { Component } from "react";
import CameraIcon from "../icons/CameraIcon";
import Product from "../product/Product";
import NavHeader from "../header/NavHeader";
import { useParams } from "react-router-dom";
import { Card, Spinner } from "reactstrap";
import ProductViolations from "../product/ProductViolations";

/**
 * products object
 * {
 *      Products[]
 * }
 */

export function AreaPageWrapper() {
  const { areaId } = useParams();

  return <AreaPage areaId={areaId} />;
}

export default class AreaPage extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], loading: true };
  }

  componentDidMount() {
    this.loadProducts();
  }

  async loadProducts() {
    const { areaId } = this.props;
    const result = await fetch('/areaapi/products/' + areaId);
    const products = JSON.parse(await result.text());
    this.setState({ products: products, loading: false });
  }

  render() {
    const { products, loading } = this.state;

    return (
      <>
        <div style={{ height: "94vh" }} className="bg-grey">
          <NavHeader />
          <div className="d-flex align-items-center gap-3 pt-3 px-4">
            <div></div>
            <div style={{ fontSize: "36px" }}>Products</div>
            <div>
              <button className="btn bg-success">
                <div className="d-flex align-items-center gap-2">
                  <div
                    style={{ fontSize: "18px", color: "rgb(228, 227, 227)" }}
                  >
                    Add
                  </div>
                  <CameraIcon color="rgb(228, 227, 227)" />
                </div>
              </button>
            </div>
          </div>
          <div className="mt-3" style={{ height: "74%", overflowY: "scroll" }}>
            {loading && (
              <div
                style={{ width: "100%" }}
                className="pt-4 d-flex justify-content-center gap-3"
              >
                <Spinner className="text-brady" />
                <h2>Loading...</h2>
              </div>
            )}
            {!loading && products.length === 0 && (
              <div
                style={{ width: "100%" }}
                className="pt-4 d-flex justify-content-center"
              >
                <h4>
                  * No products to recommend yet:{" "}
                  <em>Try adding a photo of the area!</em>
                </h4>
              </div>
            )}
            {products.map((product, i) => (
              <div className="px-4 py-2" key={`product-div-${i}`}>
                <Card className="mb-1 p-3">
                  <Product key={`product-${i}`} product={product} />
                  <ProductViolations violations={product.Violations} />
                </Card>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
