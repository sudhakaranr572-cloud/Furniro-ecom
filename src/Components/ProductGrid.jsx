import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onAdd }) {
  if (!products.length) return <p className="text-center text-muted">No products found.</p>;
  return (
    <Row className="g-4">
      {products.map((p, i) => (
        <Col key={p.id} xs={12} sm={6} lg={3}>
          <ProductCard product={p} index={i} onAdd={onAdd} />
        </Col>
      ))}
    </Row>
  );
}