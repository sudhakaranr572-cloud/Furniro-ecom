import { Container, Row, Col } from "react-bootstrap";
import { LuTrophy } from "react-icons/lu";
import { MdOutlineVerified, MdOutlineLocalShipping, MdSupportAgent } from "react-icons/md";
import { features } from "../data/products";

const featureIcons = [
  <LuTrophy />,
  <MdOutlineVerified />,
  <MdOutlineLocalShipping />,
  <MdSupportAgent />,
];

export default function Features() {
  return (
    <section className="features mt-5">
      <Container>
        <Row className="g-4">
          {features.map((f, i) => (
            <Col
              key={f.id}
              xs={12}
              sm={6}
              lg={3}
              className="d-flex align-items-center gap-3"
            >
              {featureIcons[i]}
              <div>
                <h6 className="mb-0 fw-semibold">{f.title}</h6>
                <small className="text-muted">{f.text}</small>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}