import React, { Component } from "react";
import CameraIcon from "../icons/CameraIcon";
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
import { AreaProduct } from "./AreaProduct";


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
              <Dropdown
                isOpen={dropdownOpen}
                toggle={this.toggleDropdown}
                size="lg"
              >
                <DropdownToggle caret className="bg-success" style={{}}>
                  Add
                </DropdownToggle>
                <DropdownMenu end className="m-1">
                  <DropdownItem onClick={() => nav("/camera/" + areaId)}>
                    <div className="d-flex align-items-center gap-2">
                      Add with <strong style={{ fontSize: "17px" }}>AI</strong>
                      <CameraIcon />
                    </div>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => nav("/camera/" + areaId)}>
                    <div className="d-flex align-items-center gap-2">
                      Add Product
                    </div>
                  </DropdownItem>
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
                <h4 className="px-5">
                  * No products to recommend yet:{" "}
                  <em>Try adding a photo of the area!</em>
                </h4>
              </div>
            )}
            {products.map((product, i) => <AreaProduct key={`product-${i}`} product={product} areaId={areaId} />)}
          </div>
        </div>
      </>
    );
  }
}
