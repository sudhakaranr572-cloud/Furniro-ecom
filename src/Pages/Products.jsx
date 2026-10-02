import { useEffect, useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import Header from "../components/Header";
import ProductGrid from "../Components/ProductGrid";
import { fetchFurniture } from "../data/products";

export default function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetchFurniture().then(setProducts).finally(() => setLoading(false));
  }, []);

  const list = products.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <Header title="Products" />
      <Container className="py-5">
        <Form.Control className="mb-4" placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} />
        {loading ? <div className="text-center"><Spinner animation="border" /></div> : <ProductGrid products={list} onAdd={addToCart} />}
      </Container>
    </>
  );
}