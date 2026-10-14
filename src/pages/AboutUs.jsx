import { Container, Row, Col, ListGroup } from "react-bootstrap";

export default function AboutUs() {
  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-4">About Skyline Hotel</h1>

      <Row className="align-items-center g-4">
        <Col md={6}>
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900"
            alt="Skyline Hotel"
            className="img-fluid rounded shadow-sm"
          />
        </Col>
        <Col md={6}>
          <p className="text-muted">
            Skyline Hotel is a modern hotel located in the heart of the city,
            offering a unique experience that blends luxury, comfort and warm
            hospitality. Whether you are traveling for business or pleasure, our
            team is here to make your stay unforgettable.
          </p>
          <ListGroup variant="flush" className="mt-3">
            <ListGroup.Item> Prime central location</ListGroup.Item>
            <ListGroup.Item> Elegant rooms & suites</ListGroup.Item>
            <ListGroup.Item> 24/7 front desk & concierge</ListGroup.Item>
            <ListGroup.Item> Free breakfast for all guests</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
