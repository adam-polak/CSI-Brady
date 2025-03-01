import React, { Component } from "react";
import CameraIcon from "../icons/CameraIcon";
import Product from "../product/Product";
import NavHeader from "../header/NavHeader";
import { useParams } from "react-router-dom";

/**
 * products object
 * {
 *      Products[]
 * }
 */

export function AreaPageWrapper() {
  const { areaId } = useParams();

  return <AreaPage areaId={areaId} />
}

export default class AreaPage extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  componentDidMount() {
    this.loadProducts();
  }

  async loadProducts() {
    const { areaId } = this.props;
    console.log(areaId);
    const result = await fetch('/areaapi/products/' + areaId);
    const products = JSON.parse(await result.text());
    console.log(products[0].ImgSrc);
    this.setState({ products: products });
  }

  render() {

    const { products } = this.state;

    return (
      <>
        <div style={{ height: "94vh" }} className="bg-grey">
          <NavHeader />
          <div className="d-flex align-items-center justify-content-between pt-3 px-3">
            <div></div>
            <div style={{ fontSize: "36px" }}>Products</div>
            <div>
              <button
                className="btn"
                style={{ color: "black", background: "rgb(90, 184, 73)" }}
              >
                Add <CameraIcon />
              </button>
            </div>
          </div>
          <div style={{ height: "84%", overflowY: "scroll" }}>
            {products.map((product, i) => (
              <div className="p-4" key={`product-div-${i}`}>
                <Product key={`product-${i}`} product={product} />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
