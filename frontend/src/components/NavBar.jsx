import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useState } from 'react';

const NavBar = ({ onSearch }) => {
  const { user, logout } = useAuth();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query);
    navigate('/products');
  };

  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="bg-amber-400 text-slate-900 rounded px-2 py-1">OnMart</span>
          <span>Superstore</span>
        </Link>
        <form onSubmit={handleSubmit} className="flex-1 flex bg-white rounded-md overflow-hidden">
          <input
            className="flex-1 px-3 py-2 text-slate-900 outline-none"
            placeholder="Search for products, brands, and departments"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="px-4 bg-amber-400 text-slate-900 font-semibold" type="submit">Search</button>
        </form>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/orders" className="hover:text-amber-300">Orders</Link>
          <Link to="/cart" className="hover:text-amber-300">Cart</Link>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-amber-200">Hi, {user.name}</span>
              <button onClick={logout} className="text-sm underline">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="hover:text-amber-300">Login</Link>
              <Link to="/register" className="hover:text-amber-300">Register</Link>
            </div>
          )}
        </nav>
      </div>
      <div className="bg-slate-800 text-xs sm:text-sm">
        <div className="mx-auto max-w-6xl px-4 py-2 flex gap-3 overflow-x-auto">
          <Link to="/products?department=Electronics" className="hover:text-amber-300">Electronics</Link>
          <Link to="/products?department=Home" className="hover:text-amber-300">Home & Kitchen</Link>
          <Link to="/products?department=Grocery" className="hover:text-amber-300">Grocery</Link>
          <Link to="/products?department=Clothing" className="hover:text-amber-300">Clothing</Link>
          <Link to="/services" className="hover:text-amber-300">Services & Repairs</Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
