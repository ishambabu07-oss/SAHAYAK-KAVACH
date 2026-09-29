import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Heart, CheckCircle, Calendar, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCheckIn } from '../context/CheckInContext';
import Navbar from '../components/common/Navbar';
import QuickExitButton from '../components/common/QuickExitButton';
import StatCard from '../components/common/StatCard';

const VictimDashboard = () => {
  const navigate = useNavigate();
  // Mock contexts if they are not provided
  const { user } = useAuth() || { user: { name: 'Survivor' } };
  const checkInContext = useCheckIn() || {};
  const checkInHistory = checkInContext.checkInHistory;

  const defaultCheckInData = [
    { date: '10/01', score: 65 },
    { date: '10/03', score: 68 },
    { date: '10/05', score: 72 },
    { date: '10/07', score: 70 },
    { date: '10/09', score: 75 },
    { date: '10/11', score: 80 },
    { date: '10/13', score: 82 },
  ];

  const checkInData = (checkInHistory && checkInHistory.length > 0)
    ? checkInHistory.map((item) => ({
        date: new Date(item.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }),
        score: item.score,
      }))
    : defaultCheckInData;

  const [showSupportModal, setShowSupportModal] = useState(false);

  const upcomingCheckIns = [
    { id: 1, date: 'Today, 6:00 PM', status: 'upcoming' },
    { id: 2, date: 'Yesterday', status: 'completed' },
  ];

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-[#F8FAF9] font-sans">
      <Navbar variant="victim" />
      <QuickExitButton />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name || 'Friend'}. You are safe here.</h1>
          <p className="text-gray-600">{currentDate} | Next check-in scheduled for Today at 6:00 PM</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard 
            title="Your Wellbeing Score" 
            value="82/100" 
            icon={<Heart className="w-6 h-6 text-[#1C4E3D]" />}
            trend="+2 points this week"
            trendPositive={true}
          />
          <StatCard 
            title="Check-ins Completed" 
            value="14" 
            icon={<CheckCircle className="w-6 h-6 text-[#1C4E3D]" />}
          />
          <StatCard 
            title="Days of Support" 
            value="45" 
            icon={<Calendar className="w-6 h-6 text-[#1C4E3D]" />}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Wellbeing Journey Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Wellbeing Journey</h2>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={checkInData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1C4E3D" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1C4E3D" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '0.75rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#1C4E3D" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorScore)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Scheduled Check-Ins */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Scheduled Check-Ins</h2>
            <div className="space-y-4">
              {upcomingCheckIns.map(checkIn => (
                <div key={checkIn.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50">
                  <div className="flex items-center space-x-3">
                    {checkIn.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-[#38A169]" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-[#E0A96D]" />
                    )}
                    <span className={`font-medium ${checkIn.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {checkIn.date}
                    </span>
                  </div>
                  <span className="text-sm capitalize text-gray-500">{checkIn.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button 
            onClick={() => navigate('/victim/checkin')}
            className="w-full sm:w-auto px-8 py-4 bg-[#1C4E3D] hover:bg-[#2D6A4F] text-white rounded-xl font-medium text-lg transition-colors shadow-sm"
          >
            Start Check-In
          </button>
          <button 
            onClick={() => setShowSupportModal(true)}
            className="w-full sm:w-auto px-8 py-4 border-2 border-[#E0A96D] text-gray-800 hover:bg-[#E0A96D] hover:bg-opacity-10 rounded-xl font-medium text-lg transition-colors"
          >
            Request Discreet Support
          </button>
        </div>

        {/* Helpline Banner */}
        <div className="bg-white border-t border-gray-200 p-4 rounded-xl shadow-sm flex items-center justify-center space-x-2 text-sm text-gray-600 max-w-2xl mx-auto text-center">
          <AlertCircle className="w-4 h-4 text-[#C05621]" />
          <span>National SC/ST Helpline: <strong>1800-xxx-xxxx</strong> | Women Helpline: <strong>181</strong></span>
        </div>
      </main>

      {/* Discreet Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Request Received</h3>
            <p className="text-gray-600 mb-6">
              A support counselor will reach out within 24 hours via your preferred channel in a safe and discreet manner.
            </p>
            <button 
              onClick={() => setShowSupportModal(false)}
              className="px-6 py-3 bg-[#1C4E3D] text-white rounded-xl font-medium hover:bg-[#2D6A4F] w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VictimDashboard;
