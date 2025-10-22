import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <strong>ChampWatch.org</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/about-champ">About Champ</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              href="https://bridgeviewharbour.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light ms-2"
            >
              Visit Marina
            </Nav.Link>
            <Nav.Link
              href="https://bridgeviewharbour.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary ms-2"
            >
              Shop Now
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
