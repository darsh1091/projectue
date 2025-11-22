import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api.js';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ rating: 5, comment: '' });
  const { addItem } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
    api.get(`/reviews/${id}`).then((res) => setReviews(res.data));
  }, [id]);

  const submitReview = async (e) => {
    e.preventDefault();
    await api.post('/reviews', { ...form, productId: Number(id) });
    const updated = await api.get(`/reviews/${id}`);
    setReviews(updated.data);
    setForm({ rating: 5, comment: '' });
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
      <section className="space-y-4">
        <img src={product.image} alt={product.name} className="rounded-lg shadow" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
          <p className="text-slate-600 mt-2">{product.description}</p>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            <span className="text-sm bg-amber-100 text-amber-700 px-2 py-1 rounded-full">{product.rating.toFixed(1)} ★</span>
            <span className="text-sm text-slate-500">Stock: {product.stock}</span>
          </div>
          <button
            onClick={() => addItem(product.id, 1)}
            className="mt-4 bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold px-4 py-2 rounded"
          >
            Add to cart
          </button>
        </div>
      </section>

      {/* Pattern: Chunking Information – order summary and delivery estimates separated */}
      <aside className="bg-white border rounded-lg p-4 space-y-3">
        <div>
          <h3 className="font-semibold">Delivery</h3>
          <p className="text-sm text-slate-600">Standard: 2-4 business days · Express: next day</p>
        </div>
        <div>
          <h3 className="font-semibold">Returns</h3>
          <p className="text-sm text-slate-600">30-day free returns with doorstep pickup.</p>
        </div>
        <div>
          <h3 className="font-semibold">Service</h3>
          <p className="text-sm text-slate-600">Book installation or repair from the Services tab.</p>
        </div>
      </aside>

      <section className="lg:col-span-2 bg-white p-6 rounded-lg border space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Reviews</h2>
          <span className="text-sm text-slate-500">{reviews.length} reviews</span>
        </div>
        {reviews.length === 0 && <p className="text-sm text-slate-500">No reviews yet.</p>}
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="border-b pb-3">
              <div className="flex items-center gap-2 text-sm text-amber-600">{'★'.repeat(r.rating)}</div>
              <p className="text-slate-900 font-medium">{r.user.name}</p>
              <p className="text-slate-700 text-sm mt-1">{r.comment}</p>
            </div>
          ))}
        </div>
        {user && (
          <form onSubmit={submitReview} className="space-y-3">
            <div className="flex gap-2 items-center">
              <label className="text-sm">Rating</label>
              <select
                value={form.rating}
                onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))}
                className="border rounded px-2 py-1"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <textarea
              className="w-full border rounded px-3 py-2"
              placeholder="Share your experience"
              value={form.comment}
              onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
            />
            <button className="bg-slate-900 text-white px-4 py-2 rounded" type="submit">Submit review</button>
          </form>
        )}
      </section>
    </div>
  );
};

export default ProductDetailPage;
