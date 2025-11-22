import { useEffect, useState } from 'react';
import api from '../services/api.js';

const AccountPage = () => {
  const [profile, setProfile] = useState(null);
  const [addressForm, setAddressForm] = useState({ line1: '', city: '', state: '', postalCode: '', country: 'USA', isDefault: true });

  const loadProfile = async () => {
    const res = await api.get('/auth/me');
    setProfile(res.data);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const addAddress = async (e) => {
    e.preventDefault();
    await api.post('/addresses', addressForm);
    setAddressForm({ line1: '', city: '', state: '', postalCode: '', country: 'USA', isDefault: true });
    loadProfile();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr,1fr] gap-6">
      <section className="bg-white border rounded-lg p-4 space-y-3">
        <h1 className="text-2xl font-semibold">Account</h1>
        {profile && (
          <div className="space-y-2 text-sm text-slate-700">
            <p><span className="font-semibold">Name:</span> {profile.name}</p>
            <p><span className="font-semibold">Email:</span> {profile.email}</p>
            <p><span className="font-semibold">Role:</span> {profile.role}</p>
          </div>
        )}
      </section>

      <section className="bg-white border rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-semibold">Addresses</h2>
        <div className="space-y-2">
          {profile?.addresses?.map((addr) => (
            <div key={addr.id} className="border rounded p-3 text-sm text-slate-700">
              <p>{addr.line1}</p>
              <p>{addr.city}, {addr.state} {addr.postalCode}</p>
              <p>{addr.country} {addr.isDefault && '(Default)'}</p>
            </div>
          ))}
          {(!profile?.addresses || profile.addresses.length === 0) && <p className="text-sm text-slate-500">No saved addresses.</p>}
        </div>
        <form className="grid grid-cols-2 gap-2 text-sm" onSubmit={addAddress}>
          <input className="border rounded px-2 py-1 col-span-2" placeholder="Street" value={addressForm.line1} onChange={(e) => setAddressForm((f) => ({ ...f, line1: e.target.value }))} />
          <input className="border rounded px-2 py-1" placeholder="City" value={addressForm.city} onChange={(e) => setAddressForm((f) => ({ ...f, city: e.target.value }))} />
          <input className="border rounded px-2 py-1" placeholder="State" value={addressForm.state} onChange={(e) => setAddressForm((f) => ({ ...f, state: e.target.value }))} />
          <input className="border rounded px-2 py-1" placeholder="Postal" value={addressForm.postalCode} onChange={(e) => setAddressForm((f) => ({ ...f, postalCode: e.target.value }))} />
          <input className="border rounded px-2 py-1 col-span-2" placeholder="Country" value={addressForm.country} onChange={(e) => setAddressForm((f) => ({ ...f, country: e.target.value }))} />
          <button className="col-span-2 bg-slate-900 text-white px-3 py-2 rounded" type="submit">Add address</button>
        </form>
      </section>
    </div>
  );
};

export default AccountPage;
