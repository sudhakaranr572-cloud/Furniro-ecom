import { Link } from "react-router-dom";
import { FiShare2, FiHeart } from "react-icons/fi";
import { MdCompareArrows } from "react-icons/md";

export default function ProductCard({ product, index = 0, onAdd }) {
  const discount = Math.round(product.discountPercentage || 0);
  const isNew = !discount || index % 4 === 3;
  const oldPrice = discount ? (product.price / (1 - discount / 100)).toFixed(2) : null;

  return (
    <div className="product-card">
      {discount > 0 && !isNew && <span className="badge-circle badge-discount">-{discount}%</span>}
      {isNew && <span className="badge-circle badge-new">New</span>}

      <div className="product-overlay">
        <button className="btn btn-light text-warning fw-semibold px-5 rounded-0" onClick={() => onAdd(product)}>
          Add to cart
        </button>
        <div className="overlay-actions">
          <span><FiShare2 /> Share</span>
          <Link to="/comparison" className="text-white"><MdCompareArrows /> Compare</Link>
          <span><FiHeart /> Like</span>
        </div>
      </div>

      <Link to={`/product/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} />
      </Link>
      <div className="info">
        <h5 className="fw-semibold mb-1">{product.title}</h5>
        <p className="text-muted small mb-2 text-truncate">{product.description}</p>
        <div className="fw-semibold">
          ${product.price}
          {oldPrice && <span className="old">${oldPrice}</span>}
        </div>
      </div>
    </div>
  );
}