import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <header style={{height: "6vh"}}>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm bg-brady">
          <NavbarBrand tag={Link} to="/">
            <img src="brady-logo.png" alt="Brady logo" height={30} />
          </NavbarBrand>
        </Navbar>
      </header>
    );
  }
}
