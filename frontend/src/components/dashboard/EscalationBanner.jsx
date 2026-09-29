import React, { useState } from 'react';
import { AlertTriangle, X, Clock } from 'lucide-react';

const EscalationBanner = ({ alerts }) => {
  const [activeAlerts, setActiveAlerts] = useState(alerts);

  if (!activeAlerts || activeAlerts.length === 0) return null;

  const dismissAlert = (id) => {
    setActiveAlerts(activeAlerts.filter(a => a.id !== id));
  };

  return (
    <div className="mb-6 relative">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          SLA Escalation Alerts
          <span className="bg-[#C05621] text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {activeAlerts.length}
          </span>
        </h2>
      </div>
      
      <div className="relative">
        {/* Scrollable Container */}
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {activeAlerts.map(alert => (
            <div 
              key={alert.id} 
              className="min-w-[320px] max-w-[350px] flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-[#C05621] p-4 snap-start relative flex flex-col justify-between"
            >
              <button 
                onClick={() => dismissAlert(alert.id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="flex gap-3 mb-3 pr-6">
                <div className="mt-0.5 text-[#C05621]">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{alert.victimId}</h4>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{alert.description}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C05621] bg-orange-50 px-2 py-1 rounded-md">
                  <Clock className="w-3.5 h-3.5" />
                  {alert.timeRemaining}
                </div>
                <button className="text-sm font-semibold text-white bg-[#C05621] hover:bg-[#a0471c] px-3 py-1.5 rounded-lg transition-colors">
                  Take Action
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Gradient fade on the right to indicate scrolling */}
        {activeAlerts.length > 3 && (
          <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-[#F8FAF9] to-transparent pointer-events-none"></div>
        )}
      </div>
    </div>
  );
};

export default EscalationBanner;
