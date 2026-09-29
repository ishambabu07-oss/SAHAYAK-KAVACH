import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Check, LockKeyhole, Save, UserRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { pathname } = useLocation();
  const isAuthority = pathname.startsWith('/admin');
  const [form, setForm] = useState({ name: user?.name || '', district: user?.district || '', email: user?.email || '', phone: user?.phone || '', language: user?.language || 'en' });
  const [saved, setSaved] = useState(false);

  useEffect(() => setForm({ name: user?.name || '', district: user?.district || '', email: user?.email || '', phone: user?.phone || '', language: user?.language || 'en' }), [user]);
  const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const save = (event) => { event.preventDefault(); updateProfile(form); setSaved(true); };
  const dashboardPath = isAuthority ? '/admin/dashboard/cases' : '/victim/dashboard/checkin';
  const shell = isAuthority ? 'bg-slate-100 text-slate-800' : 'bg-[#F8FAF9] text-gray-800';
  const panel = isAuthority ? 'border-slate-200 bg-white' : 'border-[#D1E7DD] bg-white';
  const primary = isAuthority ? 'bg-emerald-900 hover:bg-emerald-800' : 'bg-[#1C4E3D] hover:bg-[#2D6A4F]';

  return <main className={`min-h-screen ${shell} p-4 sm:p-8`}><div className="mx-auto max-w-3xl"><Link to={dashboardPath} className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C4E3D] hover:underline"><ArrowLeft className="h-4 w-4" />Back to dashboard</Link><div className={`mt-5 rounded-2xl border p-5 shadow-sm sm:p-8 ${panel}`}><div className="flex items-start gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#D1E7DD] text-[#1C4E3D]"><UserRound className="h-6 w-6" /></div><div><p className="text-sm font-bold uppercase tracking-wider text-slate-500">Secure profile</p><h1 className="text-2xl font-bold">{isAuthority ? 'Officer profile & jurisdiction' : 'My profile'}</h1><p className="mt-1 text-sm text-slate-600">Keep your safe contact details and preferences current.</p></div></div>{saved && <p role="status" className="mt-6 rounded-lg bg-[#D1E7DD] p-3 text-sm font-semibold text-[#1C4E3D]"><Check className="mr-2 inline h-4 w-4" />Profile updated securely.</p>}<form onSubmit={save} className="mt-6 grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold">{isAuthority ? 'Official name' : 'Preferred name'}<input required name="name" value={form.name} onChange={change} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal outline-none focus:border-[#1C4E3D] focus:ring-2 focus:ring-[#D1E7DD]" /></label><label className="text-sm font-semibold">District jurisdiction<input required name="district" value={form.district} onChange={change} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal outline-none focus:border-[#1C4E3D] focus:ring-2 focus:ring-[#D1E7DD]" /></label><label className="text-sm font-semibold">{isAuthority ? 'Official email' : 'Safe email (optional)'}<input name="email" type="email" value={form.email} onChange={change} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal outline-none focus:border-[#1C4E3D] focus:ring-2 focus:ring-[#D1E7DD]" /></label><label className="text-sm font-semibold">{isAuthority ? 'Official phone' : 'Safe callback number'}<input name="phone" value={form.phone} onChange={change} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal outline-none focus:border-[#1C4E3D] focus:ring-2 focus:ring-[#D1E7DD]" /></label>{!isAuthority && <label className="text-sm font-semibold sm:col-span-2">Preferred language<select name="language" value={form.language} onChange={change} className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 font-normal outline-none focus:border-[#1C4E3D] focus:ring-2 focus:ring-[#D1E7DD]"><option value="en">English</option><option value="hi">हिंदी (Hindi)</option><option value="or">ଓଡ଼ିଆ (Odia)</option></select></label>}<div className="sm:col-span-2 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between"><p className="flex items-center gap-2 text-xs text-slate-500"><LockKeyhole className="h-4 w-4" />Changes are encrypted and saved to your secure session.</p><button className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white ${primary}`}><Save className="h-4 w-4" />Save changes</button></div></form></div></div></main>;
};

export default ProfilePage;
