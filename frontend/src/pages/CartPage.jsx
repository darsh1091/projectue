import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

const CartPage = () => {
  const { items, updateItem, removeItem } = useCart();
  const [summary, setSummary] = useState({ subtotal: 0, tax: 0, total: 0 });

  useEffect(() => {
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const tax = Number((subtotal * 0.07).toFixed(2));
    setSummary({ subtotal, tax, total: subtotal + tax });
  }, [items]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold">Cart</h1>
        {items.map((item) => (
          <div key={item.id} className="bg-white border rounded-lg p-4 flex items-start gap-4">
            <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">{item.product.name}</h3>
              <p className="text-sm text-slate-600">{item.product.brand}</p>
              <div className="flex items-center gap-3 mt-2 text-sm text-slate-700">
                <span>${item.product.price.toFixed(2)}</span>
                <span>Qty:</span>
                <input
                  type="number"
                  min="1"
                  className="w-16 border rounded px-2"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, Number(e.target.value))}
                />
                <button className="text-red-600" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
            <div className="text-right font-semibold">${(item.product.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-slate-500">Your cart is empty.</p>}
      </section>

      {/* Pattern: Lists and Commands – clear actions next to totals */}
      <aside className="bg-white border rounded-lg p-4 space-y-3 h-fit">
        <h2 className="font-semibold text-slate-900">Order summary</h2>
        <div className="flex justify-between text-sm text-slate-700">
          <span>Subtotal</span>
          <span>${summary.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-slate-700">
          <span>Estimated tax</span>
          <span>${summary.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-slate-900">
          <span>Total</span>
          <span>${summary.total.toFixed(2)}</span>
        </div>
        <a
          href="/checkout"
          className="block text-center bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold py-2 rounded"
        >
          Proceed to checkout
        </a>
      </aside>
    </div>
  );
};

export default CartPage;
