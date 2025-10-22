import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>ChampWatch.org</h5>
            <p className="small">
              Live webcam monitoring of Lake Champlain from historic Bulwagga Bay,
              the site of the first recorded Champ sighting in 1819.
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/about" className="text-light text-decoration-none">About</Link></li>
              <li><Link to="/about-champ" className="text-light text-decoration-none">About Champ</Link></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Bridgeview Harbour Marina</h5>
            <p className="small">
              4 Dock Street<br />
              Port Henry, NY 12974<br />
              <a href="https://bridgeviewharbour.com" target="_blank" rel="noopener noreferrer" className="text-light">
                Visit Website
              </a>
              {' | '}
              <a href="https://bridgeviewharbour.com/store" target="_blank" rel="noopener noreferrer" className="text-light">
                Online Store
              </a>
            </p>
          </Col>
        </Row>
        <Row className="mt-3 pt-3 border-top border-secondary">
          <Col className="text-center small">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} ChampWatch.org - Hosted by Bridgeview Harbour Marina
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
