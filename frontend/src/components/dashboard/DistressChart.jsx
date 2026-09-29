import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-md border border-gray-100">
        <p className="text-sm font-semibold text-gray-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const DistressChart = ({ data, title }) => {
  return (
    <div className="min-w-0 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
      {title && <h3 className="text-lg font-semibold text-gray-800 mb-4 break-words">{title}</h3>}
      <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-600" aria-label="Chart legend">
        <span className="inline-flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#C05621]" />Distress Score</span>
        <span className="inline-flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#2D6A4F]" />Hope Index</span>
        <span className="inline-flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#E0A96D]" />Safety Perception</span>
      </div>
      <div className="w-full h-[260px] sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 12,
              left: 0,
              bottom: 12,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} interval="preserveStartEnd" />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="distressScore"
              name="Distress Score"
              stroke="#C05621"
              strokeWidth={3}
              dot={{ r: 4, fill: '#C05621', strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="hopeIndex"
              name="Hope Index"
              stroke="#2D6A4F"
              strokeWidth={3}
              dot={{ r: 4, fill: '#2D6A4F', strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="safetyPerception"
              name="Safety Perception"
              stroke="#E0A96D"
              strokeWidth={3}
              dot={{ r: 4, fill: '#E0A96D', strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DistressChart;
