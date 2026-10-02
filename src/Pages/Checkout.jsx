import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Header from "../components/Header";

const initial = {
  firstName: "", lastName: "", company: "", country: "India", street: "",
  city: "", province: "Tamil Nadu", zip: "", phone: "", email: "", info: "",
};

export default function Checkout({ cart }) {
  const [form, setForm] = useState(initial);
  const [payment, setPayment] = useState("bank");
  const [placed, setPlaced] = useState(false);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setPlaced(true);
  };

  if (placed)
    return (
      <>
        <Header title="Checkout" />
        <Container className="py-5 text-center">
          <h3 className="fw-bold" style={{ color: "var(--gold)" }}>Thank you, {form.firstName}!</h3>
          <p>Your order has been placed successfully.</p>
        </Container>
      </>
    );

  return (
    <>
      <Header title="Checkout" />
      <Container className="py-5">
        <Form onSubmit={handleSubmit}>
          <Row className="g-5">
            <Col lg={6}>
              <h3 className="fw-semibold mb-4">Billing details</h3>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Label className="fw-medium">First Name</Form.Label>
                  <Form.Control required name="firstName" value={form.firstName} onChange={handleChange} />
                </Col>
                <Col md={6}>
                  <Form.Label className="fw-medium">Last Name</Form.Label>
                  <Form.Control required name="lastName" value={form.lastName} onChange={handleChange} />
                </Col>
                <Col xs={12}>
                  <Form.Label className="fw-medium">Company Name (Optional)</Form.Label>
                  <Form.Control name="company" value={form.company} onChange={handleChange} />
                </Col>
                <Col xs={12}>
                  <Form.Label className="fw-medium">Country / Region</Form.Label>
                  <Form.Select name="country" value={form.country} onChange={handleChange}>
                    <option>India</option><option>Sri Lanka</option><option>USA</option>
                  </Form.Select>
                </Col>
                <Col xs={12}>
                  <Form.Label className="fw-medium">Street address</Form.Label>
                  <Form.Control required name="street" value={form.street} onChange={handleChange} />
                </Col>
                <Col xs={12}>
                  <Form.Label className="fw-medium">Town / City</Form.Label>
                  <Form.Control required name="city" value={form.city} onChange={handleChange} />
                </Col>
                <Col xs={12}>
                  <Form.Label className="fw-medium">Province</Form.Label>
                  <Form.Select name="province" value={form.province} onChange={handleChange}>
                    <option>Tamil Nadu</option><option>Western Province</option><option>Kerala</option>
                  </Form.Select>
                </Col>
                <Col xs={12}>
                  <Form.Label className="fw-medium">ZIP code</Form.Label>
                  <Form.Control required name="zip" value={form.zip} onChange={handleChange} />
                </Col>
                <Col xs={12}>
                  <Form.Label className="fw-medium">Phone</Form.Label>
                  <Form.Control required type="tel" name="phone" value={form.phone} onChange={handleChange} />
                </Col>
                <Col xs={12}>
                  <Form.Label className="fw-medium">Email address</Form.Label>
                  <Form.Control required type="email" name="email" value={form.email} onChange={handleChange} />
                </Col>
                <Col xs={12}>
                  <Form.Control name="info" placeholder="Additional information" value={form.info} onChange={handleChange} />
                </Col>
              </Row>
            </Col>

            <Col lg={6}>
              <div className="d-flex justify-content-between">
                <h5 className="fw-semibold">Product</h5><h5 className="fw-semibold">Subtotal</h5>
              </div>
              {cart.map((i) => (
                <div key={i.id} className="d-flex justify-content-between small my-2">
                  <span className="text-muted">{i.title} × {i.qty}</span>
                  <span>${(i.price * i.qty).toFixed(2)}</span>
                </div>
              ))}
              <div className="d-flex justify-content-between my-3 pb-3 border-bottom">
                <span>Total</span>
                <strong className="fs-5" style={{ color: "var(--brown)" }}>${total.toFixed(2)}</strong>
              </div>

              <Form.Check type="radio" id="bank" label="Direct Bank Transfer" checked={payment === "bank"} onChange={() => setPayment("bank")} />
              {payment === "bank" && (
                <p className="small text-muted mt-2">
                  Make your payment directly into our bank account. Please use your Order ID as the payment reference.
                  Your order will not be shipped until the funds have cleared in our account.
                </p>
              )}
              <Form.Check type="radio" id="cod" label="Cash On Delivery" checked={payment === "cod"} onChange={() => setPayment("cod")} />

              <p className="small mt-3">
                Your personal data will be used to support your experience throughout this website, to manage access to your
                account, and for other purposes described in our <strong>privacy policy.</strong>
              </p>
              <div className="text-center">
                <button type="submit" className="btn-pill" disabled={!cart.length}>Place order</button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}