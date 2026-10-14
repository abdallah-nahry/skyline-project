import { Container, Row, Col, Card } from "react-bootstrap";

const services = [
  {
    title: "Free Wi-Fi",
    description: "High-speed internet in every room and public area.",
  },
  {
    title: "Room Service",
    description: "24/7 in-room dining with a full international menu.",
  },
];

export default function Services() {
  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-1">Our Services</h1>
      <p className="text-muted mb-4">
        Everything you need for a comfortable stay
      </p>

      <Row className="g-4">
        {services.map((s) => (
          <Col md={6} key={s.title}>
            <Card className="h-100 text-center shadow-sm border-0">
              <Card.Body className="p-4">
                <Card.Title className="fw-bold">{s.title}</Card.Title>
                <Card.Text className="text-muted">{s.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
