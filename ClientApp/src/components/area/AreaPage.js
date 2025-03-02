import React, { Component } from "react";
import CameraIcon from "../icons/CameraIcon";
import Product from "../product/Product";
import NavHeader from "../header/NavHeader";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "../loading/Loading";

/**
 * products object
 * {
 *      Products[]
 * }
 */

export function AreaPageWrapper() {
  const { areaId } = useParams();
  const nav = useNavigate();

  return <AreaPage nav={nav} areaId={areaId} />
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
    const { nav, areaId } = this.props;
    const { products, loading } = this.state;

    return (
      <>
        <div style={{ height: "94vh" }} className="bg-grey">
          <NavHeader />
          <div className="d-flex align-items-center justify-content-between pt-3 px-3">
            <div></div>
            <div style={{ fontSize: "36px" }}>Products</div>
            <div>
              <button
                onClick={() => nav("/camera/" + areaId)}
                className="btn"
                style={{ color: "black", background: "rgb(90, 184, 73)" }}
              >
                Add <CameraIcon />
              </button>
            </div>
          </div>
          <div style={{ height: "80%", overflowY: "scroll" }}>
            { loading && <LoadingSpinner /> }
            { !loading && products.length === 0 && <div style={{width: "100%"}} className="pt-4 d-flex justify-content-center"><h4>* No products to recommend yet: <em>Try adding a photo of the area!</em></h4></div>}
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
