import React from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import WeatherWidget from '../components/WeatherWidget';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold">Watch for Champ Live</h1>
              <p className="lead">
                Experience live underwater and webcam footage from Bulwagga Bay,
                the legendary home of Champ, Lake Champlain's mysterious sea monster.
              </p>
              <p>
                Our cameras are positioned at the exact location where Captain Crum
                made the first recorded Champ sighting in 1819.
              </p>
              <Button
                variant="light"
                size="lg"
                href="https://bridgeviewharbour.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Bridgeview Harbour Marina
              </Button>
            </Col>
            <Col lg={6} className="mt-4 mt-lg-0">
              <Card bg="dark" text="white">
                <Card.Body className="text-center p-4">
                  <h3>Live Camera Status</h3>
                  <p className="mb-0">Camera will be live soon!</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Live Webcam Section */}
      <Container className="my-5">
        <Row>
          <Col lg={8}>
            <Card className="shadow">
              <Card.Header className="bg-dark text-white">
                <h2 className="h4 mb-0">Live Underwater Camera - Bulwagga Bay</h2>
              </Card.Header>
              <Card.Body>
                {/* Placeholder for webcam - will be replaced with actual camera feed */}
                <div
                  className="ratio ratio-16x9 bg-secondary d-flex align-items-center justify-content-center"
                  style={{ minHeight: '400px' }}
                >
                  <div className="text-center text-white">
                    <h3>Live Camera Feed</h3>
                    <p>Camera coming soon!</p>
                    <p className="small">
                      Our underwater and surface cameras will provide 24/7 monitoring
                      of Lake Champlain from historic Bulwagga Bay.
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <Alert variant="info">
                    <strong>Did you see something?</strong> Contact Bridgeview Harbour Marina
                    to report potential Champ sightings!
                  </Alert>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Weather Widget */}
          <Col lg={4} className="mt-4 mt-lg-0">
            <WeatherWidget />

            {/* Call to Action */}
            <Card className="shadow bg-success text-white">
              <Card.Body>
                <h4>Visit Us in Person!</h4>
                <p>
                  Come see Bulwagga Bay for yourself at Bridgeview Harbour Marina
                  in beautiful Port Henry, NY.
                </p>
                <Button
                  variant="light"
                  className="w-100 mb-2"
                  href="https://bridgeviewharbour.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Marina Website
                </Button>
                <Button
                  variant="outline-light"
                  className="w-100"
                  href="https://bridgeviewharbour.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Shop Our Store
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Why ChampWatch Section */}
        <Row className="mt-5">
          <Col>
            <Card className="shadow">
              <Card.Body className="p-4">
                <h2 className="text-center mb-4">Why ChampWatch?</h2>
                <Row>
                  <Col md={4} className="text-center mb-3">
                    <div className="display-4 mb-3">📹</div>
                    <h4>24/7 Monitoring</h4>
                    <p>
                      Our cameras provide continuous coverage of the waters where
                      Champ has been spotted for over 200 years.
                    </p>
                  </Col>
                  <Col md={4} className="text-center mb-3">
                    <div className="display-4 mb-3">📍</div>
                    <h4>Historic Location</h4>
                    <p>
                      Located at Bulwagga Bay, site of the first documented
                      Champ sighting by Captain Crum in 1819.
                    </p>
                  </Col>
                  <Col md={4} className="text-center mb-3">
                    <div className="display-4 mb-3">🏔️</div>
                    <h4>Beautiful Setting</h4>
                    <p>
                      Experience the stunning Adirondack views from our prime
                      location at Bridgeview Harbour Marina.
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
