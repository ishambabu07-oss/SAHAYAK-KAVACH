import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, Eye } from 'lucide-react';

const CaseloadTable = ({ cases }) => {
  const getRiskBadge = (level) => {
    switch (level.toLowerCase()) {
      case 'critical':
        return <span className="px-2.5 py-1 text-xs font-medium bg-[#C05621] text-white rounded-full">Critical</span>;
      case 'high':
        return <span className="px-2.5 py-1 text-xs font-medium bg-orange-500 text-white rounded-full">High</span>;
      case 'moderate':
        return <span className="px-2.5 py-1 text-xs font-medium bg-[#E0A96D] text-white rounded-full">Moderate</span>;
      case 'low':
        return <span className="px-2.5 py-1 text-xs font-medium bg-[#38A169] text-white rounded-full">Low</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-medium bg-gray-200 text-gray-800 rounded-full">{level}</span>;
    }
  };

  const getTrendIcon = (trend) => {
    if (trend === 'improving') {
      return <ArrowUpRight className="w-5 h-5 text-[#38A169]" />;
    }
    if (trend === 'declining') {
      return <ArrowDownRight className="w-5 h-5 text-[#C05621]" />;
    }
    return <Minus className="w-5 h-5 text-gray-400" />;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-[#C05621]';
    if (score >= 60) return 'bg-orange-500';
    if (score >= 40) return 'bg-[#E0A96D]';
    return 'bg-[#38A169]';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full">
      <div className="p-5 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Active Caseload</h3>
      </div>
      
      {/* Mobile view (cards) */}
      <div className="block lg:hidden">
        {cases.map((c, idx) => (
          <div key={idx} className="p-4 border-b border-gray-100 hover:bg-gray-50 flex flex-col space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">{c.name}</p>
                <p className="text-sm text-gray-500">{c.caseId}</p>
              </div>
              {getRiskBadge(c.riskLevel)}
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Last Check-In: {c.lastCheckIn}</span>
              <div className="flex items-center gap-1">
                <span className="text-gray-600">Trend:</span>
                {getTrendIcon(c.trend)}
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">Distress Score</span>
                <span className="font-medium text-gray-800">{c.distressScore}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${getScoreColor(c.distressScore)}`} 
                  style={{ width: `${c.distressScore}%` }}
                ></div>
              </div>
            </div>
            <button className="w-full mt-2 py-2 flex items-center justify-center gap-2 text-sm font-medium text-[#1C4E3D] bg-[#F3F6F4] hover:bg-[#E2E8F0] rounded-lg transition-colors">
              <Eye className="w-4 h-4" /> View Details
            </button>
          </div>
        ))}
      </div>

      {/* Desktop view (table) */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
              <th className="py-3 px-5 font-medium">Name & ID</th>
              <th className="py-3 px-5 font-medium">Risk Level</th>
              <th className="py-3 px-5 font-medium">Last Check-In</th>
              <th className="py-3 px-5 font-medium">Trend</th>
              <th className="py-3 px-5 font-medium min-w-[150px]">Distress Score</th>
              <th className="py-3 px-5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {cases.map((c, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-5">
                  <div className="font-semibold text-gray-900">{c.name}</div>
                  <div className="text-sm text-gray-500">{c.caseId}</div>
                </td>
                <td className="py-4 px-5">
                  {getRiskBadge(c.riskLevel)}
                </td>
                <td className="py-4 px-5 text-gray-600 text-sm">
                  {c.lastCheckIn}
                </td>
                <td className="py-4 px-5">
                  <div className="flex items-center justify-center w-8">
                    {getTrendIcon(c.trend)}
                  </div>
                </td>
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                      <div 
                        className={`h-2 rounded-full ${getScoreColor(c.distressScore)}`} 
                        style={{ width: `${c.distressScore}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{c.distressScore}</span>
                  </div>
                </td>
                <td className="py-4 px-5 text-right">
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[#1C4E3D] bg-[#F3F6F4] hover:bg-[#E2E8F0] rounded-lg transition-colors">
                    <Eye className="w-4 h-4" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CaseloadTable;
