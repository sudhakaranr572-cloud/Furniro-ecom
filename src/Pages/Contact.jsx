import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";
import Header from "../components/Header";

const info = [
  { id: 1, icon: <FaMapMarkerAlt />, title: "Address", lines: ["236 5th SE Avenue, New York NY10000, United States"] },
  { id: 2, icon: <FaPhoneAlt />, title: "Phone", lines: ["Mobile: +(84) 546-6789", "Hotline: +(84) 456-6789"] },
  { id: 3, icon: <FaClock />, title: "Working Time", lines: ["Monday-Friday: 9:00 - 22:00", "Saturday-Sunday: 9:00 - 21:00"] },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <Header title="Contact" />
      <Container className="py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Get In Touch With Us</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: 520 }}>
            For More Information About Our Product & Services. Please Feel Free To Drop Us An Email.
            Our Staff Always Be There To Help You Out. Do Not Hesitate!
          </p>
        </div>

        <Row className="g-5 justify-content-center">
          <Col lg={4}>
            {info.map((i) => (
              <div key={i.id} className="d-flex gap-3 mb-4">
                <span className="fs-5 mt-1">{i.icon}</span>
                <div>
                  <h5 className="fw-semibold">{i.title}</h5>
                  {i.lines.map((l) => (<p key={l} className="mb-0 small">{l}</p>))}
                </div>
              </div>
            ))}
          </Col>

          <Col lg={5}>
            <Form onSubmit={handleSubmit}>
              {sent && <div className="alert alert-success">Message sent successfully!</div>}
              <Form.Group className="mb-4">
                <Form.Label className="fw-medium">Your name</Form.Label>
                <Form.Control required name="name" placeholder="Abc" value={form.name} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="fw-medium">Email address</Form.Label>
                <Form.Control required type="email" name="email" placeholder="Abc@def.com" value={form.email} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="fw-medium">Subject</Form.Label>
                <Form.Control name="subject" placeholder="This is an optional" value={form.subject} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="fw-medium">Message</Form.Label>
                <Form.Control as="textarea" rows={3} required name="message" placeholder="Hi! i'd like to ask about" value={form.message} onChange={handleChange} />
              </Form.Group>
              <button type="submit" className="btn btn-gold" style={{ background: "var(--brown)" }}>Submit</button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}