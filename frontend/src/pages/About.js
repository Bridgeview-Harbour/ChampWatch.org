import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function About() {
  return (
    <Container className="my-5">
      {/* Header */}
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 text-center mb-3">About ChampWatch.org</h1>
          <p className="lead text-center text-muted">
            Bringing the legend of Lake Champlain to life through modern technology
          </p>
        </Col>
      </Row>

      {/* Mission Section */}
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2 className="mb-4">Our Mission</h2>
              <p>
                ChampWatch.org was created to share the mystery and beauty of Lake Champlain
                with the world. Through our live underwater and surface cameras positioned in
                historic Bulwagga Bay, we offer viewers a unique opportunity to watch for
                "Champ," the legendary Lake Champlain sea monster, in real-time.
              </p>
              <p>
                Our cameras are strategically placed at the exact location where the first
                documented Champ sighting occurred in 1819, giving viewers access to one of
                the most historically significant cryptozoological sites in North America.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* About Bridgeview Harbour Marina */}
      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4">Hosted by Bridgeview Harbour Marina</h2>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={6} className="mb-4">
          <Card className="shadow h-100">
            <Card.Body>
              <h3>Our Home Base</h3>
              <p>
                ChampWatch.org is proudly hosted by <strong>Bridgeview Harbour Marina</strong>,
                a premier marina located in Port Henry, New York, on the western shore of
                Lake Champlain. Our marina sits at the heart of Bulwagga Bay, making it
                the perfect location for Champ monitoring.
              </p>
              <p>
                Bridgeview Harbour Marina offers:
              </p>
              <ul>
                <li>Full-service boat slips and moorings</li>
                <li>Stunning Adirondack Mountain views</li>
                <li>Modern amenities and facilities</li>
                <li>Prime access to Lake Champlain</li>
                <li>Rich local history and culture</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} className="mb-4">
          <Card className="shadow h-100">
            <Card.Body>
              <h3>Port Henry, New York</h3>
              <p>
                Located in the scenic Adirondack region of upstate New York, Port Henry
                is a charming lakeside community with deep historical roots. The town sits
                on the shores of Bulwagga Bay, a location steeped in Champ lore and
                natural beauty.
              </p>
              <p>
                The area offers:
              </p>
              <ul>
                <li>Spectacular lake and mountain scenery</li>
                <li>Rich maritime history</li>
                <li>Year-round outdoor recreation</li>
                <li>Friendly small-town atmosphere</li>
                <li>Gateway to Adirondack adventures</li>
              </ul>
              <p className="mb-0">
                <strong>Address:</strong> 4 Dock Street, Port Henry, NY 12974
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* The Technology */}
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="shadow border-primary">
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0">Our Technology</h3>
            </Card.Header>
            <Card.Body className="p-4">
              <p>
                ChampWatch.org utilizes state-of-the-art underwater and surface cameras
                to provide continuous monitoring of Lake Champlain. Our camera system
                features:
              </p>
              <ul>
                <li><strong>24/7 Live Streaming:</strong> Around-the-clock coverage of the lake</li>
                <li><strong>High-Definition Video:</strong> Crystal-clear imagery for detailed observation</li>
                <li><strong>Weather Integration:</strong> Real-time weather data from Port Henry</li>
                <li><strong>Underwater Cameras:</strong> Unique below-surface perspective</li>
                <li><strong>Surface Cameras:</strong> Wide-angle views of Bulwagga Bay</li>
              </ul>
              <p className="mb-0">
                All footage is streamed live from Bulwagga Bay, giving viewers worldwide
                the opportunity to participate in the ongoing search for Champ.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Call to Action */}
      <Row>
        <Col lg={8} className="mx-auto">
          <Card className="shadow bg-dark text-white text-center">
            <Card.Body className="p-5">
              <h2 className="mb-4">Visit Us in Person!</h2>
              <p className="lead mb-4">
                Experience the magic of Bulwagga Bay and Lake Champlain firsthand.
                Whether you're a boater, a Champ enthusiast, or just looking for a
                beautiful lakeside destination, Bridgeview Harbour Marina welcomes you!
              </p>
              <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
                <Button
                  variant="light"
                  size="lg"
                  href="https://bridgeviewharbour.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Marina Website
                </Button>
                <Button
                  variant="outline-light"
                  size="lg"
                  href="https://bridgeviewharbour.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Shop Online Store
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
