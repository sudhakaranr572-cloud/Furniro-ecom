import { Link } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";

export default function CartSidebar({ show, onHide, cart, removeFromCart }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="fw-semibold">Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="d-flex flex-column">
        <div className="flex-grow-1">
          {cart.length === 0 && <p className="text-muted">Your cart is empty.</p>}

          {cart.map((item) => (
            <div key={item.id} className="d-flex align-items-center mb-3 gap-3">
              <img
                src={item.thumbnail}
                alt={item.title}
                width="70"
                height="70"
                style={{ objectFit: "cover", borderRadius: 8, background: "#f9f1e7" }}
              />
              <div className="flex-grow-1">
                <div>{item.title}</div>
                <small>
                  {item.qty} × <span style={{ color: "var(--gold)" }}>${item.price}</span>
                </small>
              </div>
              <button
                className="icon-btn"
                onClick={() => removeFromCart(item.id)}
                aria-label="Remove item"
              >
                <AiOutlineClose size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between fw-semibold mb-3">
          <span>Subtotal</span>
          <span style={{ color: "var(--gold)" }}>${subtotal.toFixed(2)}</span>
        </div>

        <div className="d-flex gap-2 justify-content-between">
          <Link to="/cart" onClick={onHide} className="btn btn-outline-dark btn-sm rounded-pill px-3">
            Cart
          </Link>
          <Link to="/checkout" onClick={onHide} className="btn btn-outline-dark btn-sm rounded-pill px-3">
            Checkout
          </Link>
          <Link to="/comparison" onClick={onHide} className="btn btn-outline-dark btn-sm rounded-pill px-3">
            Comparison
          </Link>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}