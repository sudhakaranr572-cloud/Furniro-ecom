import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { FiChevronRight } from "react-icons/fi";
import Hero from "../Components/Hero";
import ProductGrid from "../Components/ProductGrid";
import { fetchFurniture, categories, rooms, gallery } from "../data/products";

export default function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    fetchFurniture()
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const visible = showAll ? products : products.slice(0, 8);

  return (
    <>
      <Hero />

      <Container className="text-center py-5">
        <h3 className="fw-bold">Browse The Range</h3>
        <p className="text-muted mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <Row className="g-4">
          {categories.map((c) => (
            <Col key={c.id} xs={12} md={4}>
              <img src={c.img} alt={c.name} className="cat-img" />
              <h5 className="fw-semibold mt-3">{c.name}</h5>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="py-4">
        <h3 className="fw-bold text-center mb-4">Our Products</h3>
        {loading && <div className="text-center"><Spinner animation="border" /></div>}
        {error && <p className="text-danger text-center">{error}</p>}
        {!loading && !error && <ProductGrid products={visible} onAdd={addToCart} />}
        <div className="text-center mt-5">
          {products.length > 8 ? (
            <button className="btn btn-outline-gold" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Show More"}
            </button>
          ) : (
            <Link to="/shop" className="btn btn-outline-gold">Show More</Link>
          )}
        </div>
      </Container>

      <section className="inspire my-5">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={4}>
              <h2 className="fw-bold">50+ Beautiful rooms inspiration</h2>
              <p className="text-muted">Our designer already made a lot of beautiful prototipe of rooms that inspire you</p>
              <Link to="/shop" className="btn btn-gold">Explore More</Link>
            </Col>
            <Col lg={8}>
              <Row className="g-3 align-items-end">
                {rooms.map((r, i) => (
                  <Col key={r.id} xs={12} md={i === slide ? 6 : 3} className={i < slide ? "d-none d-md-block" : ""}>
                    <div className="position-relative">
                      <img src={r.img} alt={r.title} style={{ height: i === slide ? 420 : 320 }} />
                      {i === slide && (
                        <div className="position-absolute bg-white bg-opacity-75 p-3" style={{ left: 20, bottom: 20 }}>
                          <small>{r.label}</small>
                          <h5 className="mb-0">{r.title}</h5>
                        </div>
                      )}
                    </div>
                  </Col>
                ))}
              </Row>
              <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
                {rooms.map((r, i) => (
                  <button
                    key={r.id}
                    onClick={() => setSlide(i)}
                    aria-label={`Slide ${i + 1}`}
                    style={{ width: 12, height: 12, borderRadius: "50%", border: "none", background: i === slide ? "var(--gold)" : "#d8d8d8" }}
                  />
                ))}
                <button className="icon-btn" onClick={() => setSlide((slide + 1) % rooms.length)}><FiChevronRight /></button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="text-center py-4 gallery">
        <p className="mb-0 fw-semibold">Share your setup with</p>
        <h2 className="fw-bold mb-4">#FuniroFurniture</h2>
        <Row className="g-3 align-items-end">
          {gallery.map((g) => (
            <Col key={g.id} xs={6} md={4} lg={2}>
              <img src={g.img} alt="setup" style={{ height: g.h }} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}