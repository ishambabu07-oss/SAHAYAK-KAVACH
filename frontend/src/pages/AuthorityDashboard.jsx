import React from 'react';
import { 
  Users, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  Calendar, 
  FileText, 
  ShieldAlert, 
  PhoneCall,
  Activity
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import EscalationBanner from '../components/dashboard/EscalationBanner';
import DistressChart from '../components/dashboard/DistressChart';
import CaseloadTable from '../components/dashboard/CaseloadTable';
import Navbar from '../components/common/Navbar';

// Mock Data
const mockData = {
  escalationAlerts: [
    { id: 1, victimId: 'VIC-8992', description: 'No response to consecutive daily check-ins. Distress score elevated.', timeRemaining: '2h 15m left', severity: 'critical' },
    { id: 2, victimId: 'VIC-4011', description: 'Safety perception dropped below threshold during last assessment.', timeRemaining: '4h 30m left', severity: 'high' },
    { id: 3, victimId: 'VIC-7734', description: 'Missed scheduled counseling session. Unable to reach emergency contact.', timeRemaining: '5h 00m left', severity: 'high' },
  ],
  distressTimeline: [
    { name: 'Mon', distressScore: 65, hopeIndex: 40, safetyPerception: 50 },
    { name: 'Tue', distressScore: 68, hopeIndex: 38, safetyPerception: 45 },
    { name: 'Wed', distressScore: 60, hopeIndex: 45, safetyPerception: 55 },
    { name: 'Thu', distressScore: 55, hopeIndex: 50, safetyPerception: 65 },
    { name: 'Fri', distressScore: 45, hopeIndex: 60, safetyPerception: 75 },
    { name: 'Sat', distressScore: 42, hopeIndex: 65, safetyPerception: 78 },
    { name: 'Sun', distressScore: 38, hopeIndex: 70, safetyPerception: 85 },
  ],
  monthlyTrends: [
    { name: 'Jan', newCases: 45, resolved: 30, escalated: 5 },
    { name: 'Feb', newCases: 52, resolved: 38, escalated: 8 },
    { name: 'Mar', newCases: 48, resolved: 42, escalated: 4 },
    { name: 'Apr', newCases: 61, resolved: 45, escalated: 12 },
    { name: 'May', newCases: 55, resolved: 50, escalated: 6 },
    { name: 'Jun', newCases: 40, resolved: 60, escalated: 3 },
  ],
  districtStats: [
    { id: 1, name: 'North District', activeCases: 145, riskLevel: 'red' },
    { id: 2, name: 'South District', activeCases: 89, riskLevel: 'green' },
    { id: 3, name: 'East District', activeCases: 112, riskLevel: 'amber' },
    { id: 4, name: 'West District', activeCases: 156, riskLevel: 'red' },
    { id: 5, name: 'Central District', activeCases: 74, riskLevel: 'green' },
  ],
  counselorCaseload: [
    { name: 'Priya S.', caseId: 'CAS-1029', riskLevel: 'Critical', lastCheckIn: '2 hours ago', trend: 'declining', distressScore: 85 },
    { name: 'Rahul M.', caseId: 'CAS-1045', riskLevel: 'High', lastCheckIn: '5 hours ago', trend: 'improving', distressScore: 72 },
    { name: 'Anita K.', caseId: 'CAS-1088', riskLevel: 'Moderate', lastCheckIn: '1 day ago', trend: 'stable', distressScore: 45 },
    { name: 'Vikram D.', caseId: 'CAS-1102', riskLevel: 'Low', lastCheckIn: '2 days ago', trend: 'improving', distressScore: 25 },
    { name: 'Sneha R.', caseId: 'CAS-1134', riskLevel: 'High', lastCheckIn: '4 hours ago', trend: 'declining', distressScore: 78 },
  ]
};

const StatCard = ({ title, value, icon: Icon, trend, trendLabel, iconColor, textColor }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className={`p-2 rounded-lg bg-gray-50 ${iconColor}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div className="mt-2">
      <span className={`text-3xl font-bold ${textColor || 'text-gray-900'}`}>{value}</span>
    </div>
    {trend && (
      <div className="mt-2 flex items-center text-sm">
        <span className={trend.startsWith('+') ? 'text-[#38A169]' : 'text-[#C05621]'}>
          {trend}
        </span>
        <span className="text-gray-500 ml-2">{trendLabel}</span>
      </div>
    )}
  </div>
);

const AuthorityDashboard = () => {
  return (
    <div className="min-h-screen bg-[#F8FAF9] font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Escalation Alerts */}
        <EscalationBanner alerts={mockData.escalationAlerts} />

        {/* Metric Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Active Cases" 
            value="432" 
            icon={Users} 
            trend="+12%" 
            trendLabel="vs last month"
            iconColor="text-[#1C4E3D]"
          />
          <StatCard 
            title="High Risk Alerts" 
            value="28" 
            icon={AlertTriangle} 
            trend="+4" 
            trendLabel="since yesterday"
            iconColor="text-[#C05621]"
            textColor="text-[#C05621]"
          />
          <StatCard 
            title="Avg Response Time" 
            value="1.4h" 
            icon={Clock} 
            trend="-0.2h" 
            trendLabel="vs last week"
            iconColor="text-[#E0A96D]"
          />
          <StatCard 
            title="Resolution Rate" 
            value="84%" 
            icon={TrendingUp} 
            trend="+2.5%" 
            trendLabel="vs last month"
            iconColor="text-[#38A169]"
            textColor="text-[#38A169]"
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Distress Trajectory */}
            <DistressChart data={mockData.distressTimeline} title="Distress Trajectory — All Active Cases" />

            {/* Monthly Trends */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Case Trends</h3>
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockData.monthlyTrends} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                    <Tooltip cursor={{ fill: '#F8FAF9' }} />
                    <Legend wrapperStyle={{ paddingTop: '10px' }} />
                    <Bar dataKey="newCases" name="New Cases" fill="#1C4E3D" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="resolved" name="Resolved" fill="#38A169" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="escalated" name="Escalated" fill="#C05621" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-3">
                <button className="flex items-center gap-3 w-full p-3 text-left rounded-xl hover:bg-[#F3F6F4] transition-colors border border-gray-50 group">
                  <div className="bg-emerald-100 p-2 rounded-lg text-[#1C4E3D] group-hover:bg-[#1C4E3D] group-hover:text-white transition-colors">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-700">Schedule Check-In</span>
                </button>
                <button className="flex items-center gap-3 w-full p-3 text-left rounded-xl hover:bg-[#F3F6F4] transition-colors border border-gray-50 group">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-700">Generate Report</span>
                </button>
                <button className="flex items-center gap-3 w-full p-3 text-left rounded-xl hover:bg-orange-50 transition-colors border border-gray-50 group">
                  <div className="bg-orange-100 p-2 rounded-lg text-[#C05621] group-hover:bg-[#C05621] group-hover:text-white transition-colors">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-700">Emergency Protocol</span>
                </button>
                <button className="flex items-center gap-3 w-full p-3 text-left rounded-xl hover:bg-[#F3F6F4] transition-colors border border-gray-50 group">
                  <div className="bg-gray-100 p-2 rounded-lg text-gray-700 group-hover:bg-gray-700 group-hover:text-white transition-colors">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-700">Contact Supervisor</span>
                </button>
              </div>
            </div>

            {/* District Overview */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">District Overview</h3>
              <div className="space-y-3">
                {mockData.districtStats.map(district => (
                  <div key={district.id} className="flex items-center justify-between p-3 bg-[#F8FAF9] rounded-xl">
                    <span className="font-medium text-gray-700">{district.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">{district.activeCases} cases</span>
                      <div className={`w-3 h-3 rounded-full ${
                        district.riskLevel === 'red' ? 'bg-[#C05621]' : 
                        district.riskLevel === 'amber' ? 'bg-[#E0A96D]' : 'bg-[#38A169]'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Section: Active Caseload */}
        <CaseloadTable cases={mockData.counselorCaseload} />
        
      </main>
    </div>
  );
};

export default AuthorityDashboard;
