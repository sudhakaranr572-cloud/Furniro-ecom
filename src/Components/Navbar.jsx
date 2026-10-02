import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar as BsNavbar, Nav, Container } from "react-bootstrap";
import { FiUser, FiSearch, FiHeart, FiShoppingCart, FiX } from "react-icons/fi";
import CartSidebar from "./CartSidebar";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ cart, removeFromCart }) {
  const [showCart, setShowCart] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <BsNavbar expand="lg" expanded={expanded} className="bg-white py-3 sticky-top shadow-sm">
        <Container>
          <BsNavbar.Brand as={Link} to="/" className="brand">
            <span>▲</span> Furniro
          </BsNavbar.Brand>

          <BsNavbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="nav">
            {expanded ? <FiX size={24} /> : undefined}
          </BsNavbar.Toggle>

          <BsNavbar.Collapse id="nav">
            <Nav className="mx-auto gap-lg-4 text-center">
              {links.map((l) => (
                <Nav.Link
                  key={l.to}
                  as={NavLink}
                  to={l.to}
                  end={l.to === "/"}
                  className="nav-link-custom"
                  onClick={() => setExpanded(false)}
                >
                  {l.label}
                </Nav.Link>
              ))}
            </Nav>

            <div className="d-flex justify-content-center gap-4">
              <button className="icon-btn" aria-label="Account"><FiUser /></button>
              <button className="icon-btn" aria-label="Search"><FiSearch /></button>
              <button className="icon-btn" aria-label="Wishlist"><FiHeart /></button>
              <button className="icon-btn" aria-label="Cart" onClick={() => setShowCart(true)}>
                <FiShoppingCart />
                {count > 0 && <span className="cart-count">{count}</span>}
              </button>
            </div>
          </BsNavbar.Collapse>
        </Container>
      </BsNavbar>

    
    <CartSidebar
  show={showCart}
  onHide={() => setShowCart(false)}
  cart={cart}
  removeFromCart={removeFromCart}
/>



    </>
  );
}