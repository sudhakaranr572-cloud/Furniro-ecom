import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FaUser, FaCalendarAlt, FaTag } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Header from "../components/Header";
import { blogPosts, blogCategories } from "../data/products";

const PER_PAGE = 3;

export default function Blog() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("");

  const filtered = blogPosts.filter(
    (p) => p.title.toLowerCase().includes(query.toLowerCase()) && (!cat || p.tag === cat)
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const posts = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <Header title="Blog" />
      <Container className="py-5">
        <Row className="g-5">
          <Col lg={8}>
            {posts.map((p) => (
              <article key={p.id} className="mb-5">
                <img src={p.img} alt={p.title} className="blog-img" />
                <div className="d-flex gap-4 text-muted small my-3">
                  <span><FaUser /> Admin</span>
                  <span><FaCalendarAlt /> {p.date}</span>
                  <span><FaTag /> {p.tag}</span>
                </div>
                <h3 className="fw-medium">{p.title}</h3>
                <p className="text-muted small">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin
                  aliquam ultrices sagittis orci a scelerisque purus semper eget.
                </p>
                <a href="#!" className="border-bottom border-dark pb-1 fw-medium">Read more</a>
              </article>
            ))}
            {!posts.length && <p className="text-muted">No posts found.</p>}

            <div className="d-flex justify-content-center align-items-center flex-wrap gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} className={`page-btn ${page === i + 1 ? "active" : ""}`} onClick={() => setPage(i + 1)}>
                  {i + 1}
                </button>
              ))}
              <button className="page-btn" style={{ width: 90 }} disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                Next
              </button>
            </div>
          </Col>

          <Col lg={4}>
            <div className="position-relative mb-5">
              <Form.Control
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                placeholder="Search"
              />
              <FiSearch className="position-absolute" style={{ right: 15, top: 18 }} />
            </div>

            <h5 className="fw-semibold mb-4">Categories</h5>
            {blogCategories.map((c) => (
              <div
                key={c.name}
                className="d-flex justify-content-between text-muted mb-3"
                style={{ cursor: "pointer", color: cat === c.name ? "var(--gold)" : undefined }}
                onClick={() => { setCat(cat === c.name ? "" : c.name); setPage(1); }}
              >
                <span>{c.name}</span><span>{c.count}</span>
              </div>
            ))}

            <h5 className="fw-semibold my-4">Recent Posts</h5>
            {blogPosts.slice(0, 5).map((p) => (
              <div key={p.id} className="d-flex gap-3 mb-3 align-items-center">
                <img src={p.img} alt="" className="recent-img" />
                <div>
                  <div className="small">{p.title}</div>
                  <small className="text-muted">{p.date}</small>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}