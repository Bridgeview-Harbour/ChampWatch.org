import React from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';

function AboutChamp() {
  return (
    <Container className="my-5">
      {/* Header */}
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 text-center mb-3">About Champ</h1>
          <p className="lead text-center text-muted">
            The legendary Lake Champlain sea monster
          </p>
        </Col>
      </Row>

      {/* Introduction */}
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2 className="mb-4">The Legend of Champ</h2>
              <p className="lead">
                For centuries, Lake Champlain has been home to one of North America's
                most enduring cryptozoological mysteries: Champ, a creature described
                as a large, serpent-like animal inhabiting the lake's deep waters.
              </p>
              <p>
                Native American tribes, including the Abenaki and Iroquois, told stories
                of a creature living in the lake long before European settlers arrived.
                They called the lake "Bitawbagok" or "waters that lie between" and spoke
                of a powerful water creature that demanded respect.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Samuel de Champlain Section */}
      <Row className="mb-5">
        <Col lg={10} className="mx-auto">
          <Card className="shadow border-info">
            <Card.Header className="bg-info text-white">
              <h3 className="mb-0">The Samuel de Champlain Connection</h3>
            </Card.Header>
            <Card.Body className="p-4">
              <p>
                The creature is often linked to Samuel de Champlain, the French explorer
                who gave the lake its name when he mapped the area in 1609. Early accounts
                suggested Champlain saw the creature, making him part of the legend.
              </p>
              <Alert variant="warning" className="mb-3">
                <strong>Historical Note:</strong> Modern historians have clarified that
                Champlain's journals describe seeing a large fish near the St. Lawrence
                River, likely a lake sturgeon (garfish), not in Lake Champlain itself.
                While this debunks the literal connection, it doesn't diminish the rich
                folklore surrounding the lake.
              </Alert>
              <p className="mb-0">
                Despite this clarification, Champlain's name remains intertwined with the
                legend, and his exploration of the region opened the door for centuries
                of reported sightings and stories.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* First Documented Sighting - Bulwagga Bay */}
      <Row className="mb-5">
        <Col>
          <Card className="shadow border-danger">
            <Card.Header className="bg-danger text-white">
              <h3 className="mb-0">July 22, 1819: The First Documented Sighting at Bulwagga Bay</h3>
            </Card.Header>
            <Card.Body className="p-4">
              <Row>
                <Col md={8}>
                  <p className="lead">
                    <strong>The landmark moment in Champ history occurred right here at
                    Bulwagga Bay, Port Henry, New York.</strong>
                  </p>
                  <p>
                    On July 22, 1819, a man named <strong>Captain Crum</strong> reported
                    seeing an enormous creature in the waters of Bulwagga Bay. His
                    description was detailed and dramatic:
                  </p>
                  <blockquote className="border-start border-4 border-danger ps-3 mb-3">
                    <p className="fst-italic">
                      "A black monster, about 187 feet long with a head resembling a
                      sea horse that reared more than 15 feet out of the water."
                    </p>
                  </blockquote>
                  <p>
                    This sighting, published in local newspapers, marked the beginning
                    of documented Champ sightings and established Bulwagga Bay as a
                    significant location in Champ lore.
                  </p>
                </Col>
                <Col md={4}>
                  <Card className="bg-light">
                    <Card.Body>
                      <h5 className="text-danger">Key Facts</h5>
                      <ul className="small mb-0">
                        <li><strong>Date:</strong> July 22, 1819</li>
                        <li><strong>Location:</strong> Bulwagga Bay, Port Henry, NY</li>
                        <li><strong>Witness:</strong> Captain Crum</li>
                        <li><strong>Size:</strong> Approximately 187 feet</li>
                        <li><strong>Description:</strong> Black, serpent-like, sea horse head</li>
                        <li><strong>Height:</strong> 15+ feet above water</li>
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Alert variant="danger" className="mt-3 mb-0">
                <strong>You're watching from the exact location of this historic sighting!</strong>
                {' '}Our cameras at Bridgeview Harbour Marina are positioned in Bulwagga Bay,
                where Captain Crum made his famous observation over 200 years ago.
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modern Sightings */}
      <Row className="mb-5">
        <Col lg={10} className="mx-auto">
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2 className="mb-4">Modern Sightings and Evidence</h2>
              <p>
                Since Captain Crum's 1819 sighting, hundreds of people have reported
                seeing Champ in Lake Champlain. Sightings continue to this day, keeping
                the legend alive and attracting cryptozoology enthusiasts from around
                the world.
              </p>

              <h4 className="mt-4 mb-3">Notable Sightings:</h4>
              <ul>
                <li>
                  <strong>1977 - Sandra Mansi Photo:</strong> Perhaps the most famous
                  piece of Champ evidence, Sandra Mansi photographed what appears to be
                  a long-necked creature in the lake. The photo has been analyzed
                  extensively and remains unexplained.
                </li>
                <li>
                  <strong>1980s-1990s:</strong> Multiple sonar readings detected large,
                  unexplained objects moving through Lake Champlain's depths.
                </li>
                <li>
                  <strong>2005:</strong> Two fishermen captured video footage of something
                  large moving through the water near Ferrisburgh, Vermont.
                </li>
                <li>
                  <strong>August 2024 - Recent Drone Footage:</strong> During filming of
                  "Lucy and the Lake Monster," drone footage captured what appeared to be
                  a large creature swimming below the surface in Bulwagga Bay, renewing
                  interest in the legend.
                </li>
              </ul>

              <h4 className="mt-4 mb-3">Scientific Perspectives:</h4>
              <p>
                Skeptics suggest sightings could be misidentifications of:
              </p>
              <ul>
                <li>Large lake sturgeon (which can grow to 6-8 feet)</li>
                <li>Floating logs or debris</li>
                <li>Wave patterns and optical illusions</li>
                <li>Large schools of fish</li>
              </ul>
              <p>
                However, believers point to the consistency of descriptions across
                centuries, the depth and size of Lake Champlain (120 miles long,
                400 feet deep), and indigenous knowledge as evidence that something
                unusual may inhabit these waters.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Why Bulwagga Bay Matters */}
      <Row className="mb-5">
        <Col lg={10} className="mx-auto">
          <Card className="shadow bg-success text-white">
            <Card.Body className="p-4">
              <h2 className="mb-4">Why Bulwagga Bay Matters</h2>
              <Row>
                <Col md={6}>
                  <h4>Historical Significance</h4>
                  <p>
                    Bulwagga Bay holds the distinction of being the site of the first
                    widely-documented Champ sighting. This makes it ground zero for
                    modern Champ investigations and a pilgrimage site for cryptozoology
                    enthusiasts.
                  </p>
                </Col>
                <Col md={6}>
                  <h4>Ongoing Activity</h4>
                  <p>
                    Sightings have continued in this area throughout the 19th, 20th,
                    and 21st centuries, including the recent 2024 drone footage.
                    Bulwagga Bay remains an active location for Champ watchers.
                  </p>
                </Col>
              </Row>
              <Alert variant="light" className="mt-3 mb-0">
                <strong className="text-success">ChampWatch.org brings you 24/7 access
                to this historic location.</strong> Our cameras at Bridgeview Harbour
                Marina offer the best continuous monitoring of Bulwagga Bay ever available
                to the public.
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Lake Champlain Facts */}
      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4">Lake Champlain: Perfect Habitat?</h2>
        </Col>
      </Row>
      <Row>
        <Col md={3} className="mb-3">
          <Card className="shadow text-center h-100">
            <Card.Body>
              <div className="display-4 mb-3">📏</div>
              <h4>120 Miles Long</h4>
              <p className="small mb-0">
                One of the largest freshwater lakes in the United States
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="shadow text-center h-100">
            <Card.Body>
              <div className="display-4 mb-3">🌊</div>
              <h4>400 Feet Deep</h4>
              <p className="small mb-0">
                Deep enough to hide large creatures from casual observation
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="shadow text-center h-100">
            <Card.Body>
              <div className="display-4 mb-3">🐟</div>
              <h4>Rich Ecosystem</h4>
              <p className="small mb-0">
                Abundant fish populations could support a large predator
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="shadow text-center h-100">
            <Card.Body>
              <div className="display-4 mb-3">🏔️</div>
              <h4>Connected Waters</h4>
              <p className="small mb-0">
                Historical connections to the Atlantic via waterways
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutChamp;
