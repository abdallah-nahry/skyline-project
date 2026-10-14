import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section
      className="d-flex align-items-center justify-content-center text-center text-white"
      style={{
        minHeight: "80vh",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <h1 className="display-3 fw-bold mb-3">Welcome to Skyline Hotel</h1>
        <p className="lead mb-4">
          Luxury, comfort, and a view above the clouds.
        </p>
        <Button
          as={Link}
          to="/booking"
          variant="warning"
          size="lg"
          className="fw-semibold px-4"
        >
          Book Now
        </Button>
      </Container>
    </section>
  );
}
