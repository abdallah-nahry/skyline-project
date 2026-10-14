import { Link, NavLink } from "react-router-dom";
import { Navbar as AliasNavbar, Nav, Container, Button } from "react-bootstrap";

export default function Navbar() {
  return (
    <AliasNavbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <AliasNavbar.Brand as={Link} to="/" className="fw-bold text-warning">
          Skyline Hotel
        </AliasNavbar.Brand>

        <AliasNavbar.Toggle aria-controls="main-nav" />
        <AliasNavbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/services">
              Services
            </Nav.Link>
            <Nav.Link as={NavLink} to="/booking">
              Booking
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About Us
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contact Us
            </Nav.Link>
          </Nav>
          <Button
            as={Link}
            to="/booking"
            variant="warning"
            className="fw-semibold"
          >
            Book Now
          </Button>
        </AliasNavbar.Collapse>
      </Container>
    </AliasNavbar>
  );
}
