import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Header({ title }) {
  return (
    <section className="page-banner text-center">
      <div style={{ color: "var(--gold)", fontSize: "2rem", lineHeight: 1 }}>▲</div>
      <h1>{title}</h1>
      <div className="d-flex align-items-center gap-1 fw-medium">
        <Link to="/">Home</Link>
        <MdKeyboardArrowRight />
        <span className="fw-normal">{title}</span>
      </div>
    </section>
  );
}