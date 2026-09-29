import React from 'react';
import { X } from 'lucide-react';

const QuickExitButton = () => {
  const handleEmergencyExit = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace('https://www.google.com');
  };

  return (
    <button
      onClick={handleEmergencyExit}
      title="Quick Exit"
      aria-label="Emergency quick exit - leaves this page immediately"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#C05621] text-white rounded-full shadow-lg hover:bg-red-700 transition-colors duration-200 group focus:outline-none focus:ring-4 focus:ring-red-300 animate-pulse"
    >
      <X size={28} />
      <span className="absolute right-16 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Quick Exit
      </span>
    </button>
  );
};

export default QuickExitButton;
