import React from "react";
import CameraIcon from "./icons/CameraIcon";
import Product from "./product/Product";

/**
 * products object
 * {
 *      Products[]
 * }
 */

export default function AreaPage() {
  // props: { products }
  const product1 = {
    Name: "Brady M710 Label Printer",
    ImageSrc:
      "https://cdn-01-artemis.media-brady.com/Assets/ImageRoot/WPSAmericasWeb_Name/04/87/M710_Left_Angled_BWI-3d_seton_dam_4800487.jpg",
    Link: "https://www.seton.com/m710-labeler-2-label-width-from-brady-bid155.html",
    Violations: [],
  };

  const products = [product1];

  return (
    <>
      {/* <NavHeader/> */}
      <div style={{ height: "93vh" }} className="bg-grey">
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
        {products.map((product) => (
          <div className="p-4">
            <Product product={product} />
          </div>
        ))}
      </div>
    </>
  );
}
