import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-3">
      {/* Container : is component from lib : react Bootstrap */}
      <Container>
        <small>© 2026 Skyline Hotel - All rights reserved</small>
      </Container>
    </footer>
  );
}
