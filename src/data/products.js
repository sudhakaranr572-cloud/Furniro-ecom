export const API_URL = "https://dummyjson.com/products/category/furniture";

export const fetchFurniture = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.products;
};

export const fetchProductById = async (id) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
};

export const categories = [
  { id: 1, name: "Dining", img: "https://picsum.photos/seed/dining/600/700" },
  { id: 2, name: "Living", img: "https://picsum.photos/seed/living/600/700" },
  { id: 3, name: "Bedroom", img: "https://picsum.photos/seed/bedroom/600/700" },
];

export const rooms = [
  { id: 1, label: "01 — Bed Room", title: "Inner Peace", img: "https://picsum.photos/seed/room1/600/800" },
  { id: 2, label: "02 — Dining", title: "Warm Table", img: "https://picsum.photos/seed/room2/600/800" },
  { id: 3, label: "03 — Living", title: "Soft Light", img: "https://picsum.photos/seed/room3/600/800" },
];

export const gallery = [
  { id: 1, h: 220, img: "https://picsum.photos/seed/g1/500/400" },
  { id: 2, h: 300, img: "https://picsum.photos/seed/g2/500/500" },
  { id: 3, h: 220, img: "https://picsum.photos/seed/g3/500/400" },
  { id: 4, h: 300, img: "https://picsum.photos/seed/g4/500/500" },
  { id: 5, h: 220, img: "https://picsum.photos/seed/g5/500/400" },
  { id: 6, h: 300, img: "https://picsum.photos/seed/g6/500/500" },
];

export const blogPosts = [
  { id: 1, title: "Going all-in with millennial design", tag: "Wood", date: "14 Oct 2022", img: "https://picsum.photos/seed/b1/900/600" },
  { id: 2, title: "Exploring new ways of decorating", tag: "Handmade", date: "14 Oct 2022", img: "https://picsum.photos/seed/b2/900/600" },
  { id: 3, title: "Handmade pieces that took time to make", tag: "Wood", date: "14 Oct 2022", img: "https://picsum.photos/seed/b3/900/600" },
  { id: 4, title: "Modern home in Milan", tag: "Interior", date: "03 Aug 2022", img: "https://picsum.photos/seed/b4/900/600" },
  { id: 5, title: "Colorful office redesign", tag: "Design", date: "03 Aug 2022", img: "https://picsum.photos/seed/b5/900/600" },
  { id: 6, title: "Crafting with natural materials", tag: "Crafts", date: "01 Aug 2022", img: "https://picsum.photos/seed/b6/900/600" },
];

export const blogCategories = [
  { name: "Crafts", count: 2 },
  { name: "Design", count: 8 },
  { name: "Handmade", count: 7 },
  { name: "Interior", count: 1 },
  { name: "Wood", count: 6 },
];

export const features = [
  { id: 1, title: "High Quality", text: "crafted from top materials" },
  { id: 2, title: "Warranty Protection", text: "Over 2 years" },
  { id: 3, title: "Free Shipping", text: "Order over 150 $" },
  { id: 4, title: "24 / 7 Support", text: "Dedicated support" },
];