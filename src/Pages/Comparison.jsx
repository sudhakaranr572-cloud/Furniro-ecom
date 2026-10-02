import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import Header from "../Components/Header";
import { fetchFurniture } from "../data/products";

const rows = [
  { section: "General" },
  { label: "SKU", get: (p) => p.sku },
  { label: "Brand", get: (p) => p.brand || "Furniro" },
  { label: "Category", get: (p) => p.category },
  { label: "Availability", get: (p) => p.availabilityStatus },
  { section: "Dimensions" },
  { label: "Width", get: (p) => `${p.dimensions?.width} cm` },
  { label: "Height", get: (p) => `${p.dimensions?.height} cm` },
  { label: "Depth", get: (p) => `${p.dimensions?.depth} cm` },
  { label: "Weight", get: (p) => `${p.weight} KG` },
  { section: "Warranty" },
  { label: "Warranty Summary", get: (p) => p.warrantyInformation },
  { label: "Shipping", get: (p) => p.shippingInformation },
  { label: "Return Policy", get: (p) => p.returnPolicy },
];

export default function Comparison({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFurniture()
      .then((list) => {
        setProducts(list);
        setSelected(list.slice(0, 2));
      })
      .finally(() => setLoading(false));
  }, []);

  const addProduct = (id) => {
    const p = products.find((x) => x.id === Number(id));
    if (p && !selected.some((s) => s.id === p.id)) setSelected([...selected, p].slice(-3));
  };

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;

  return (
    <>
      <Header title="Product Comparison" />
      <Container className="py-5" style={{ overflowX: "auto" }}>
        <div style={{ minWidth: 700 }}>
          <Row className="mb-4 align-items-end">
            <Col xs={3}>
              <h5 className="fw-semibold">Go to Product page for more Products</h5>
              <Link to="/shop" className="text-muted border-bottom">View More</Link>
            </Col>
            {selected.map((p) => (
              <Col key={p.id} xs={3}>
                <img src={p.thumbnail} alt={p.title} width="140" height="100" style={{ objectFit: "cover", borderRadius: 8 }} />
                <h6 className="fw-semibold mt-2 mb-0">{p.title}</h6>
                <small>${p.price}</small>
                <div className="d-flex align-items-center gap-1 small">
                  {p.rating} <FaStar color="#FFC700" /> <span className="text-muted">({p.reviews?.length} Review)</span>
                </div>
              </Col>
            ))}
            <Col xs={3}>
              <h6 className="fw-bold">Add A Product</h6>
              <Form.Select
                value=""
                onChange={(e) => addProduct(e.target.value)}
                style={{ background: "var(--brown)", color: "#fff", padding: "0.5rem" }}
              >
                <option value="">Choose a Product</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          {rows.map((r, i) =>
            r.section ? (
              <h5 key={i} className="fw-semibold mt-5 mb-3">{r.section}</h5>
            ) : (
              <Row key={i} className="compare-row">
                <Col xs={3} className="fw-medium">{r.label}</Col>
                {selected.map((p) => (
                  <Col key={p.id} xs={3} className="small">{r.get(p)}</Col>
                ))}
              </Row>
            )
          )}

          <Row className="mt-4">
            <Col xs={3} />
            {selected.map((p) => (
              <Col key={p.id} xs={3}>
                <button className="btn btn-gold" style={{ background: "var(--brown)" }} onClick={() => addToCart(p)}>
                  Add To Cart
                </button>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
}