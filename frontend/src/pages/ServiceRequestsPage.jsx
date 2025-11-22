import { useEffect, useState } from 'react';
import api from '../services/api.js';

const ServiceRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({ type: 'Installation', description: '', preferredDate: '' });

  const fetchRequests = async () => {
    const res = await api.get('/services/mine');
    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/services', form);
    setForm({ type: 'Installation', description: '', preferredDate: '' });
    fetchRequests();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,1fr] gap-6">
      <section className="bg-white border rounded-lg p-4 space-y-4">
        <h1 className="text-2xl font-semibold">Schedule service</h1>
        {/* Pattern: Forms and Controls – grouped service request form */}
        <form className="space-y-3" onSubmit={submit}>
          <div>
            <label className="text-sm text-slate-600">Service type</label>
            <select
              className="mt-1 w-full border rounded px-2 py-2"
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
            >
              <option>Installation</option>
              <option>Repair</option>
              <option>Home visit</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-600">Preferred date</label>
            <input
              type="date"
              className="mt-1 w-full border rounded px-2 py-2"
              value={form.preferredDate}
              onChange={(e) => setForm((f) => ({ ...f, preferredDate: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Describe the issue</label>
            <textarea
              className="mt-1 w-full border rounded px-3 py-2"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>
          <button className="bg-slate-900 text-white px-4 py-2 rounded" type="submit">Submit request</button>
        </form>
      </section>

      <aside className="bg-white border rounded-lg p-4 space-y-3">
        <h2 className="font-semibold text-slate-900">Your requests</h2>
        <div className="space-y-3">
          {requests.map((req) => (
            <div key={req.id} className="border rounded p-3">
              <p className="font-semibold">{req.type}</p>
              <p className="text-sm text-slate-600">{req.description}</p>
              <p className="text-xs text-slate-500">{new Date(req.preferredDate).toLocaleDateString()} · {req.status}</p>
            </div>
          ))}
        </div>
        {requests.length === 0 && <p className="text-sm text-slate-500">No requests yet.</p>}
      </aside>
    </div>
  );
};

export default ServiceRequestsPage;
