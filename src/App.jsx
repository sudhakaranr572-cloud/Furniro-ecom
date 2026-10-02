import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Comparison from "./pages/Comparison";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (p, qty = 1) =>
    setCart((prev) => {
      const found = prev.find((i) => i.id === p.id);
      if (found)
        return prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + qty } : i));
      return [
        ...prev,
        { id: p.id, title: p.title, price: p.price, thumbnail: p.thumbnail, qty },
      ];
    });

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, qty) =>
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
    );

  return (
    <>
      <Navbar cart={cart} removeFromCart={removeFromCart} />
      <main>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/shop" element={<Shop addToCart={addToCart} />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
          <Route path="/comparison" element={<Comparison addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={<Cart cart={cart} removeFromCart={removeFromCart} updateQty={updateQty} />}
          />
          <Route path="/checkout" element={<Checkout cart={cart} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<Blog />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}