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

    // const violation1 = {
    //   Name: "OSHA 1910.303(e)",
    //   Summary:
    //     "Electric equipment must have identification of manufacturer and ratings.",
    //   Link: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.303#1910.303(e)",
    // };
    // const product1 = {
    //   Name: "Brady M710 Label Printer",
    //   ImageSrc:
    //     "https://cdn-01-artemis.media-brady.com/Assets/ImageRoot/WPSAmericasWeb_Name/04/87/M710_Left_Angled_BWI-3d_seton_dam_4800487.jpg",
    //   Link: "https://www.seton.com/m710-labeler-2-label-width-from-brady-bid155.html",
    //   Violations: [violation1, violation1],
    // };

    // for (let i = 0; i < 100; ++i) {
    //   products[i] = product1;
    // }

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
