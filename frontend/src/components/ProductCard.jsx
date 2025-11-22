import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-4 flex flex-col gap-3">
      <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded" />
      <Link to={`/products/${product.id}`} className="font-semibold text-slate-900 line-clamp-2 hover:text-amber-700">
        {product.name}
      </Link>
      <div className="text-sm text-slate-600">{product.brand}</div>
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-slate-900">${product.price.toFixed(2)}</span>
        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">{product.rating.toFixed(1)} ★</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-500">{product.category?.name} · {product.category?.department?.name}</div>
      <button
        onClick={() => addItem(product.id, 1)}
        className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
