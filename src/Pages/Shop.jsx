import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { FiFilter, FiGrid, FiList } from "react-icons/fi";
import Header from "../Components/Header";
import ProductGrid from "../Components/ProductGrid";
import { fetchFurniture } from "../data/products";

export default function Shop({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [perPage, setPerPage] = useState(4);
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    fetchFurniture()
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [products, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const start = (page - 1) * perPage;
  const current = filtered.slice(start, start + perPage);

  useEffect(() => setPage(1), [search, sort, perPage]);

  return (
    <>
      <Header title="Shop" />

      <div style={{ background: "#f9f1e7" }} className="py-3">
        <Container>
          <Row className="align-items-center g-3">
            <Col xs={12} lg={6} className="d-flex align-items-center gap-3">
              <button className="icon-btn fs-6" onClick={() => setShowFilter(!showFilter)}>
                <FiFilter /> Filter
              </button>
              <FiGrid />
              <FiList />
              <small className="border-start ps-3">
                Showing {filtered.length ? start + 1 : 0}–{Math.min(start + perPage, filtered.length)} of {filtered.length} results
              </small>
            </Col>
            <Col xs={12} lg={6} className="d-flex justify-content-lg-end align-items-center gap-3 flex-wrap">
              <span>Show</span>
              <Form.Select style={{ width: 90 }} value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={16}>16</option>
              </Form.Select>
              <span>Sort by</span>
              <Form.Select style={{ width: 160 }} value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="default">Default</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="name">Name</option>
              </Form.Select>
            </Col>
            {showFilter && (
              <Col xs={12}>
                <Form.Control placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </Col>
            )}
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        {loading && <div className="text-center"><Spinner animation="border" /></div>}
        {error && <p className="text-danger text-center">{error}</p>}
        {!loading && !error && <ProductGrid products={current} onAdd={addToCart} />}

        <div className="d-flex justify-content-center align-items-center mt-5 flex-wrap gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} className={`page-btn ${page === i + 1 ? "active" : ""}`} onClick={() => setPage(i + 1)}>
              {i + 1}
            </button>
          ))}
          <button className="page-btn" style={{ width: 90 }} disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      </Container>
    </>
  );
}