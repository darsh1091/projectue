import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filters, setFilters] = useState({ brand: '', sort: '', departmentId: '', minPrice: '', maxPrice: '' });
  const [searchParams] = useSearchParams();

  useEffect(() => {
    api.get('/departments').then((res) => setDepartments(res.data));
  }, []);

  useEffect(() => {
    const department = searchParams.get('department');
    const params = new URLSearchParams();
    if (department) params.append('departmentId', departments.find((d) => d.name.includes(department))?.id || '');
    if (filters.brand) params.append('brand', filters.brand);
    if (filters.sort) params.append('sort', filters.sort);
    if (filters.departmentId) params.append('departmentId', filters.departmentId);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    api.get(`/products?${params.toString()}`).then((res) => setProducts(res.data));
  }, [filters, searchParams, departments]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-6">
      <aside className="bg-white border rounded-lg p-4 space-y-4">
        <h2 className="font-semibold text-slate-900">Refine results</h2>
        <div>
          <label className="text-sm text-slate-600">Department</label>
          <select
            className="mt-1 w-full border rounded px-2 py-1"
            value={filters.departmentId}
            onChange={(e) => setFilters((f) => ({ ...f, departmentId: e.target.value }))}
          >
            <option value="">All</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-slate-600">Brand</label>
          <input
            className="mt-1 w-full border rounded px-2 py-1"
            value={filters.brand}
            onChange={(e) => setFilters((f) => ({ ...f, brand: e.target.value }))}
            placeholder="e.g. Apex"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input
            className="border rounded px-2 py-1"
            placeholder="Min $"
            value={filters.minPrice}
            onChange={(e) => setFilters((f) => ({ ...f, minPrice: e.target.value }))}
          />
          <input
            className="border rounded px-2 py-1"
            placeholder="Max $"
            value={filters.maxPrice}
            onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value }))}
          />
        </div>
        <div>
          <label className="text-sm text-slate-600">Sort by</label>
          <select
            className="mt-1 w-full border rounded px-2 py-1"
            value={filters.sort}
            onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
          >
            <option value="">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </aside>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-slate-500">{products.length} results</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductListingPage;
