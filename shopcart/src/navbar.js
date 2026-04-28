// navbar.js
// Navbar component with router links for home and cart.

import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";

function NavigationBar({ totalItems }) {
  return (
    <Navbar bg="info" variant="dark" className="mb-4">
      <Container>
        {/* Clicking the shop logo goes back to the home page */}
        <Navbar.Brand as={Link} to="/">
          Shop 2 React
        </Navbar.Brand>

        <Nav>
          {/* Clicking the cart icon goes to the cart page */}
          <Nav.Link as={Link} to="/cart" className="text-white">
            <FaShoppingCart /> {totalItems} items
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
