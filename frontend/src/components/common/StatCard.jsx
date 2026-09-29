import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const colorMap = {
  sage: 'bg-[#1C4E3D]/10 text-[#1C4E3D]',
  emerald: 'bg-[#2D6A4F]/10 text-[#2D6A4F]',
  sand: 'bg-[#E0A96D]/10 text-[#E0A96D]',
  terracotta: 'bg-[#C05621]/10 text-[#C05621]',
  mint: 'bg-[#38A169]/10 text-[#38A169]',
};

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend = 'neutral', 
  trendValue, 
  color = 'sage' 
}) => {
  
  const getTrendContent = () => {
    switch (trend) {
      case 'up':
        return (
          <div className="flex items-center text-sm font-medium text-[#C05621] mt-2">
            <ArrowUpRight className="h-4 w-4 mr-1" aria-hidden="true" />
            <span>{trendValue}</span>
          </div>
        );
      case 'down':
        return (
          <div className="flex items-center text-sm font-medium text-[#38A169] mt-2">
            <ArrowDownRight className="h-4 w-4 mr-1" aria-hidden="true" />
            <span>{trendValue}</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center text-sm font-medium text-gray-500 mt-2">
            <Minus className="h-4 w-4 mr-1" aria-hidden="true" />
            <span>{trendValue || 'No change'}</span>
          </div>
        );
    }
  };

  const badgeColor = colorMap[color] || colorMap.sage;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 hover:scale-[1.02] transition-transform duration-200">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        
        {Icon && (
          <div className={`p-3 rounded-full flex items-center justify-center ${badgeColor}`}>
            {React.isValidElement(Icon) ? Icon : <Icon className="h-6 w-6" aria-hidden="true" />}
          </div>
        )}
      </div>
      
      {getTrendContent()}
    </div>
  );
};

export default StatCard;
