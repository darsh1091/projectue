import { useEffect, useState } from 'react';
import api from '../services/api.js';

const statusColors = {
  PENDING: 'bg-slate-100 text-slate-700',
  PROCESSING: 'bg-blue-100 text-blue-700',
  SHIPPED: 'bg-amber-100 text-amber-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
  RETURN_REQUESTED: 'bg-purple-100 text-purple-700',
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await api.get('/orders');
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (id) => {
    await api.post(`/orders/${id}/cancel`);
    fetchOrders();
  };

  const returnOrder = async (id) => {
    await api.post(`/orders/${id}/return`);
    fetchOrders();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Your orders</h1>
      {orders.map((order) => (
        <div key={order.id} className="bg-white border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Order #{order.id}</p>
              <p className="text-lg font-semibold">${order.total.toFixed(2)}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${statusColors[order.status]}`}>{order.status}</span>
          </div>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-slate-700">
                <span>{item.product.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          {/* Pattern: Layout of Screen Elements – using horizontal action bar */}
          <div className="flex gap-3 text-sm">
            {['PENDING', 'PROCESSING'].includes(order.status) && (
              <button className="text-red-600" onClick={() => cancelOrder(order.id)}>Request cancellation</button>
            )}
            {['DELIVERED'].includes(order.status) && (
              <button className="text-purple-700" onClick={() => returnOrder(order.id)}>Request return</button>
            )}
          </div>
        </div>
      ))}
      {orders.length === 0 && <p className="text-sm text-slate-500">No orders yet.</p>}
    </div>
  );
};

export default OrdersPage;
