import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Features from "./Features";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];
const help = ["Payment Options", "Returns", "Privacy Policies"];

export default function Footer() {
  return (
    <>
      <Features />

      <footer className="pt-5 pb-3">
        <Container>
          <Row className="g-4">
            <Col lg={4}>
              <h4 className="fw-bold mb-4">Funiro.</h4>
              <p className="text-muted">
                400 University Drive Suite 200 Coral Gables,<br />FL 33134 USA
              </p>
            </Col>
            <Col xs={6} lg={2}>
              <p className="footer-title">Links</p>
              {links.map((l) => (
                <Link key={l.to} to={l.to} className="footer-link">{l.label}</Link>
              ))}
            </Col>
            <Col xs={6} lg={2}>
              <p className="footer-title">Help</p>
              {help.map((h) => (
                <a key={h} href="#!" className="footer-link">{h}</a>
              ))}
            </Col>
            <Col lg={4}>
              <p className="footer-title">Newsletter</p>
              <div className="newsletter">
                <input type="email" placeholder="Enter Your Email Address" />
                <button type="button">SUBSCRIBE</button>
              </div>
            </Col>
          </Row>
          <hr className="mt-4" />
          <p className="mb-0">2023 furino. All rights reserved</p>
        </Container>
      </footer>
    </>
  );
}