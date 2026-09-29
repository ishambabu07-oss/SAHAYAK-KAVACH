import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const GroundingModal = ({ open, onClose }) => {
  const [seconds, setSeconds] = useState(60);
  useEffect(() => { if (!open) return undefined; setSeconds(60); const timer = setInterval(() => setSeconds((value) => value > 0 ? value - 1 : 0), 1000); return () => clearInterval(timer); }, [open]);
  if (!open) return null;
  const phase = seconds % 12 < 4 ? 'Breathe in' : seconds % 12 < 8 ? 'Hold gently' : 'Breathe out';
  return <div role="dialog" aria-modal="true" aria-label="60-second grounding exercise" className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 p-4"><div className="w-full max-w-md rounded-3xl bg-[#F8FAF9] p-8 text-center shadow-2xl"><button onClick={onClose} aria-label="Close grounding exercise" className="float-right text-slate-500"><X/></button><p className="text-sm font-semibold text-[#2D6A4F]">60-second grounding</p><div className="mx-auto mt-6 grid h-44 w-44 place-items-center rounded-full border-8 border-[#D1E7DD] bg-white text-center shadow-inner animate-pulse"><div><b className="block text-xl text-[#1C4E3D]">{phase}</b><span className="mt-2 block text-sm text-slate-500">{seconds}s remaining</span></div></div><p className="mt-6 text-sm leading-6 text-slate-600">Notice one thing you can see, one thing you can feel, and the support beneath you. You can stop whenever you want.</p><button onClick={onClose} className="mt-6 rounded-xl bg-[#1C4E3D] px-5 py-3 font-semibold text-white">Return when ready</button></div></div>;
};
export default GroundingModal;
