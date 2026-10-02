import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-card">
        <p className="fw-semibold mb-1" style={{ letterSpacing: 3 }}>New Arrival</p>
        <h1>Discover Our<br />New Collection</h1>
        <p className="my-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
        </p>
        <Link to="/shop" className="btn btn-gold">BUY NOW</Link>
      </div>
    </section>
  );
}
