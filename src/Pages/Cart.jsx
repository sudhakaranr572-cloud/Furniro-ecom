import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Header from "../Components/Header";

export default function Cart({ cart, removeFromCart, updateQty }) {
  const navigate = useNavigate();
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <>
      <Header title="Cart" />
      <Container className="py-5">
        <Row className="g-5">
          <Col lg={8}>
            {cart.length === 0 ? (
              <p className="text-muted">
                Your cart is empty. <Link to="/shop" className="text-decoration-underline">Go shopping</Link>
              </p>
            ) : (
              <Table responsive borderless className="align-middle">
                <thead className="cart-head">
                  <tr>
                    <th></th><th>Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.thumbnail} alt={item.title} width="80" height="80" style={{ objectFit: "cover", borderRadius: 10, background: "#f9f1e7" }} />
                      </td>
                      <td className="text-muted">{item.title}</td>
                      <td className="text-muted">${item.price}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => updateQty(item.id, Number(e.target.value))}
                          className="form-control text-center"
                          style={{ width: 70, padding: "0.3rem" }}
                        />
                      </td>
                      <td>${(item.price * item.qty).toFixed(2)}</td>
                      <td>
                        <button className="icon-btn" style={{ color: "var(--brown)" }} onClick={() => removeFromCart(item.id)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>

          <Col lg={4}>
            <div className="p-4 text-center" style={{ background: "#f9f1e7" }}>
              <h3 className="fw-semibold mb-4">Cart Totals</h3>
              <div className="d-flex justify-content-between mb-3">
                <strong>Subtotal</strong><span className="text-muted">${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong style={{ color: "var(--gold)" }}>${subtotal.toFixed(2)}</strong>
              </div>
              <button className="btn-pill" disabled={!cart.length} onClick={() => navigate("/checkout")}>
                Check Out
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}