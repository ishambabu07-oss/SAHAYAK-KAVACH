import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ inline = false, message = 'Loading...' }) => {
  if (inline) {
    return (
      <div className="flex items-center justify-center space-x-2 text-[#1C4E3D]">
        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
        {message && <span className="text-sm font-medium">{message}</span>}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAF9]">
      <Loader2 className="w-12 h-12 text-[#1C4E3D] animate-spin mb-4" aria-hidden="true" />
      {message && (
        <p className="text-gray-600 font-medium text-lg animate-pulse">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
