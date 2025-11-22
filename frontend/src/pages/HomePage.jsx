import { useEffect, useState } from 'react';
import api from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    api.get('/products').then((res) => setProducts(res.data.slice(0, 6)));
    api.get('/departments').then((res) => setDepartments(res.data));
  }, []);

  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-amber-400 via-amber-300 to-orange-200 p-8 rounded-xl shadow">
        <div className="max-w-2xl space-y-3">
          <h1 className="text-4xl font-bold text-slate-900">OnMart Superstore</h1>
          <p className="text-slate-800">
            One-stop marketplace for electronics, home essentials, groceries, apparel, and expert services. Enjoy fast delivery,
            flexible returns, and trusted repairs.
          </p>
          <div className="flex gap-3">
            <span className="px-3 py-1 bg-white/80 rounded-full text-sm">Customer obsession</span>
            <span className="px-3 py-1 bg-white/80 rounded-full text-sm">Service & repairs</span>
            <span className="px-3 py-1 bg-white/80 rounded-full text-sm">Secure checkout</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {departments.map((dept) => (
          <div key={dept.id} className="bg-white rounded-lg border p-4 hover:shadow">
            <h3 className="font-semibold text-slate-900">{dept.name}</h3>
            <p className="text-sm text-slate-600 mt-1 line-clamp-2">{dept.description}</p>
            <p className="text-xs text-amber-700 mt-2">Shop {dept.categories.length} categories</p>
          </div>
        ))}
      </section>

      {/* Pattern: Chunking Information – featured carousel separate from policy highlights */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Featured picks for you</h2>
          <span className="text-sm text-slate-500">Curated across departments</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Pattern: Interactive Information Graphics – simple KPI cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 text-white p-4 rounded-lg">
          <p className="text-sm">Delivery promise</p>
          <p className="text-2xl font-bold">2-day standard</p>
          <p className="text-xs mt-1 text-slate-200">Across 80% of catalog</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-slate-600">Active service experts</p>
          <p className="text-2xl font-bold text-slate-900">120+</p>
          <p className="text-xs text-slate-500">Installations & repairs</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-slate-600">Returns window</p>
          <p className="text-2xl font-bold text-slate-900">30 days</p>
          <p className="text-xs text-slate-500">Hassle-free doorstep pickup</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
