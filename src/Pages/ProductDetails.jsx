import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { FaStar, FaStarHalfAlt, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import ProductGrid from "../components/ProductGrid";
import { fetchProductById, fetchFurniture } from "../data/products";

const sizes = ["L", "XL", "XS"];
const colors = ["#816DFA", "#000000", "#B88E2F"];
const tabs = ["Description", "Additional Information", "Reviews"];

export default function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [img, setImg] = useState("");
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("L");
  const [color, setColor] = useState(colors[0]);
  const [tab, setTab] = useState("Description");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    fetchProductById(id)
      .then((p) => {
        setProduct(p);
        setImg(p.thumbnail);
        setQty(1);
      })
      .finally(() => setLoading(false));
    fetchFurniture().then((list) => setRelated(list.filter((p) => String(p.id) !== id)));
  }, [id]);

  if (loading || !product) return <div className="text-center py-5"><Spinner animation="border" /></div>;

  const rating = Math.round(product.rating * 2) / 2;
  const stars = Array.from({ length: 5 }, (_, i) =>
    i + 1 <= rating ? <FaStar key={i} /> : i + 0.5 === rating ? <FaStarHalfAlt key={i} /> : <FaStar key={i} color="#ddd" />
  );
  const images = product.images?.length ? product.images : [product.thumbnail];

  return (
    <>
      <div style={{ background: "#f9f1e7" }} className="py-3">
        <Container className="d-flex align-items-center gap-2 small">
          <Link to="/" className="text-muted">Home</Link><MdKeyboardArrowRight />
          <Link to="/shop" className="text-muted">Shop</Link><MdKeyboardArrowRight />
          <span className="border-start ps-3">{product.title}</span>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="g-4">
          <Col lg={6}>
            <Row>
              <Col xs={3} md={2} className="d-flex flex-column">
                {images.map((src, i) => (
                  <img key={i} src={src} alt="" className={`thumb ${img === src ? "active" : ""}`} onClick={() => setImg(src)} />
                ))}
              </Col>
              <Col xs={9} md={10}>
                <img src={img} alt={product.title} className="main-img" />
              </Col>
            </Row>
          </Col>

          <Col lg={6}>
            <h2 className="fw-normal">{product.title}</h2>
            <h5 className="text-muted">${product.price}</h5>
            <div className="d-flex align-items-center gap-3 my-2" style={{ color: "#FFC700" }}>
              <span className="d-flex gap-1">{stars}</span>
              <small className="text-muted border-start ps-3">{product.reviews?.length || 0} Customer Review</small>
            </div>
            <p className="small">{product.description}</p>

            <p className="small text-muted mb-1">Size</p>
            <div className="mb-3">
              {sizes.map((s) => (
                <button key={s} className={`size-btn ${size === s ? "active" : ""}`} onClick={() => setSize(s)}>{s}</button>
              ))}
            </div>

            <p className="small text-muted mb-1">Color</p>
            <div className="d-flex mb-4">
              {colors.map((c) => (
                <span key={c} className={`color-dot ${color === c ? "active" : ""}`} style={{ background: c }} onClick={() => setColor(c)} />
              ))}
            </div>

            <div className="d-flex flex-wrap gap-3 pb-4 border-bottom">
              <div className="qty-box">
                <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <button className="btn-pill" onClick={() => addToCart(product, qty)}>Add To Cart</button>
              <Link to="/comparison" className="btn-pill"><FiPlus /> Compare</Link>
            </div>

            <table className="small text-muted mt-4">
              <tbody>
                <tr><td className="pe-5 py-1">SKU</td><td>: {product.sku}</td></tr>
                <tr><td className="py-1">Category</td><td>: {product.category}</td></tr>
                <tr><td className="py-1">Tags</td><td>: {product.tags?.join(", ")}</td></tr>
                <tr>
                  <td className="py-1">Share</td>
                  <td className="d-flex gap-3 text-dark">: <FaFacebook /><FaLinkedin /><FaTwitter /></td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>

        <div className="border-top mt-5 pt-4">
          <div className="text-center mb-4">
            {tabs.map((t) => (
              <button key={t} className={`tab-btn ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
                {t === "Reviews" ? `Reviews [${product.reviews?.length || 0}]` : t}
              </button>
            ))}
          </div>

          <div className="mx-auto" style={{ maxWidth: 900 }}>
            {tab === "Description" && <p className="text-muted">{product.description}</p>}
            {tab === "Additional Information" && (
              <ul className="text-muted">
                <li>Brand: {product.brand || "Furniro"}</li>
                <li>Weight: {product.weight} kg</li>
                <li>Dimensions: {product.dimensions?.width} × {product.dimensions?.height} × {product.dimensions?.depth} cm</li>
                <li>Warranty: {product.warrantyInformation}</li>
                <li>Shipping: {product.shippingInformation}</li>
              </ul>
            )}
            {tab === "Reviews" &&
              (product.reviews || []).map((r, i) => (
                <div key={i} className="border-bottom py-2">
                  <strong>{r.reviewerName}</strong> <span className="text-warning">{"★".repeat(r.rating)}</span>
                  <p className="mb-0 text-muted">{r.comment}</p>
                </div>
              ))}
          </div>
        </div>

        <h3 className="text-center fw-medium my-5">Related Products</h3>
        <ProductGrid products={related.slice(0, 4)} onAdd={addToCart} />
      </Container>
    </>
  );
}