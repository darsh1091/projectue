import { useEffect, useState } from 'react';
import api from '../services/api.js';

const CheckoutPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({ shippingAddress: '', shippingMethod: 'Standard' });
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    api.get('/addresses').then((res) => {
      setAddresses(res.data);
      if (res.data.length) setForm((f) => ({ ...f, shippingAddress: res.data.find((a) => a.isDefault)?.line1 || res.data[0].line1 }));
    });
  }, []);

  const submitOrder = async (e) => {
    e.preventDefault();
    const res = await api.post('/orders', form);
    setConfirmation(res.data);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        {/* Pattern: Forms and Controls – labeled inputs with validation messaging */}
        <form className="bg-white border rounded-lg p-4 space-y-4" onSubmit={submitOrder}>
          <div>
            <label className="text-sm text-slate-600">Shipping address</label>
            <select
              className="mt-1 w-full border rounded px-2 py-2"
              value={form.shippingAddress}
              onChange={(e) => setForm((f) => ({ ...f, shippingAddress: e.target.value }))}
            >
              {addresses.map((addr) => (
                <option key={addr.id} value={`${addr.line1}, ${addr.city}`}>{addr.line1}, {addr.city}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-600">Shipping method</label>
            <select
              className="mt-1 w-full border rounded px-2 py-2"
              value={form.shippingMethod}
              onChange={(e) => setForm((f) => ({ ...f, shippingMethod: e.target.value }))}
            >
              <option>Standard</option>
              <option>Express</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
            <div className="p-3 border rounded">
              <p className="font-semibold">Payment</p>
              <p>Dummy card details accepted; no real charge.</p>
            </div>
            <div className="p-3 border rounded">
              <p className="font-semibold">Security</p>
              <p>Encrypted transport and tokenized session.</p>
            </div>
          </div>
          <button type="submit" className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold px-4 py-2 rounded">
            Place order
          </button>
        </form>
        {confirmation && (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded">
            Order created! ID #{confirmation.id} · status {confirmation.status}
          </div>
        )}
      </section>

      <aside className="bg-white border rounded-lg p-4 space-y-3 h-fit">
        <h2 className="font-semibold text-slate-900">Checkout checklist</h2>
        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
          <li>Review quantities in cart</li>
          <li>Confirm delivery speed</li>
          <li>Provide reachable phone for driver</li>
          <li>Enjoy doorstep returns within 30 days</li>
        </ul>
      </aside>
    </div>
  );
};

export default CheckoutPage;
