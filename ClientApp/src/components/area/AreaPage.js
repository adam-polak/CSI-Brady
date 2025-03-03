import React, { Component } from "react";
import CameraIcon from "../icons/CameraIcon";
import Product from "../product/Product";
import NavHeader from "../header/NavHeader";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "../loading/Loading";
import {
  Card,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import ProductViolations from "../product/ProductViolations";
import ImageIcon from "../icons/ImageIcon";

/**
 * products object
 * {
 *      Products[]
 * }
 */

export function AreaPageWrapper() {
  const { areaId } = useParams();
  const nav = useNavigate();

  return <AreaPage nav={nav} areaId={areaId} />;
}

export default class AreaPage extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], loading: true, dropdownOpen: false };

    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  componentDidMount() {
    this.loadProducts();
  }

  toggleDropdown() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  async loadProducts() {
    const { areaId } = this.props;
    const result = await fetch("/areaapi/products/" + areaId);
    const products = JSON.parse(await result.text());
    this.setState({ products: products, loading: false });
  }

  render() {
    const { nav, areaId } = this.props;
    const { products, loading } = this.state;
    const { dropdownOpen } = this.state;

    return (
      <>
        <div style={{ height: "94vh" }} className="bg-grey">
          <NavHeader />
          <div className="d-flex align-items-center gap-3 pt-3 px-4">
            <div></div>
            <div style={{ fontSize: "36px" }}>Products</div>
            <div>
              <Dropdown isOpen={dropdownOpen} toggle={this.toggleDropdown}>
                <DropdownToggle caret>Add</DropdownToggle>
                <DropdownMenu>

                    <button
                      className="btn"
                      onClick={() => nav("/camera/" + areaId)}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <div
                          style={{
                            fontSize: "18px",
                            color: "rgb(228, 227, 227)",
                          }}
                        >
                          Add
                        </div>
                        <CameraIcon color="rgb(228, 227, 227)" />
                      </div>
                    </button>

                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="mt-3" style={{ height: "72%", overflowY: "scroll" }}>
            {loading && <LoadingSpinner />}
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
                  <div className="d-flex align-items-center justify-content-between">
                    <Product key={`product-${i}`} product={product} />
                    <button
                      onClick={() => nav(`/images/${areaId}/${product.Id}`)}
                      className="btn"
                    >
                      <ImageIcon size={"30px"} />
                    </button>
                  </div>
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
