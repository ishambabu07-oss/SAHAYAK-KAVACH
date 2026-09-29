import React from 'react';
import { Shield } from 'lucide-react';

const QuickExitButton = () => {
  const exitSafely = () => window.location.replace('https://news.google.com');

  return <button onClick={exitSafely} aria-label="Stealth shield: leave this workspace immediately" title="Stealth Shield — leave this page" className="fixed right-4 top-4 z-[70] inline-flex items-center gap-2 rounded-full bg-[#1C4E3D] px-3 py-2 text-sm font-bold text-white shadow-lg transition hover:bg-[#2D6A4F] focus:outline-none focus:ring-4 focus:ring-[#D1E7DD]"><Shield className="h-4 w-4"/><span className="hidden sm:inline">Stealth Shield</span></button>;
};

export default QuickExitButton;
