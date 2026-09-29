export const victimProfile = {
  id: 'V-2024-0847',
  name: 'Meera Nayak',
  age: 28,
  district: 'Kalahandi',
  block: 'Bhawanipatna',
  village: 'Karlapada',
  phone: '+91 9876543210',
  language: 'Odia',
  riskLevel: 'high',
  registrationDate: '2024-01-15',
  caseDetails: {
    firNumber: 'FIR-24-0012',
    policeStation: 'Bhawanipatna Town PS',
    caseStatus: 'Investigation Ongoing',
    protectionOfficer: 'Sumita Das',
    counselor: 'Dr. Ananya Mishra'
  },
  emergencyContacts: [
    { name: 'Ramesh Nayak', relation: 'Brother', phone: '+91 9876543211' }
  ],
  recentActivity: [
    { date: '2024-02-28', type: 'Check-in', status: 'Completed', note: 'Reported anxiety' },
    { date: '2024-02-25', type: 'Counseling', status: 'Attended', note: 'Progressing well' }
  ]
};

export const checkInQuestions = [
  {
    id: 'q1',
    category: 'emotional',
    empathyMessage: 'Hello. I hope you are in a safe space right now.',
    text: 'How are you feeling emotionally today?',
    responseType: 'choice',
    options: ['Calm', 'Anxious', 'Sad', 'Overwhelmed', 'Fearful']
  },
  {
    id: 'q2',
    category: 'safety',
    empathyMessage: 'Your safety is our priority.',
    text: 'Do you feel physically safe in your current environment?',
    responseType: 'scale',
    options: []
  },
  {
    id: 'q3',
    category: 'support',
    empathyMessage: 'We are here for you.',
    text: 'Have you been able to connect with your support system (family/friends) recently?',
    responseType: 'choice',
    options: ['Yes, regularly', 'Sometimes', 'No, not at all']
  },
  {
    id: 'q4',
    category: 'daily-functioning',
    empathyMessage: 'Taking care of yourself is important.',
    text: 'How has your sleep been over the last few nights?',
    responseType: 'choice',
    options: ['Good', 'Disturbed', 'Barely slept']
  },
  {
    id: 'q5',
    category: 'emotional',
    empathyMessage: 'It is okay to have tough days.',
    text: 'Are you experiencing any recurring distressing thoughts?',
    responseType: 'choice',
    options: ['None', 'Occasionally', 'Frequently']
  },
  {
    id: 'q6',
    category: 'safety',
    empathyMessage: 'Remember, help is just a click away.',
    text: 'Has there been any contact from the perpetrator or their associates?',
    responseType: 'choice',
    options: ['No', 'Attempted contact', 'Yes']
  },
  {
    id: 'q7',
    category: 'support',
    empathyMessage: 'Professional help makes a difference.',
    text: 'Did the coping strategies discussed in your last session help?',
    responseType: 'choice',
    options: ['Very helpful', 'Somewhat helpful', 'Not helpful']
  },
  {
    id: 'q8',
    category: 'daily-functioning',
    empathyMessage: 'One step at a time.',
    text: 'Is there anything specific you need immediate assistance with today?',
    responseType: 'text',
    options: []
  }
];

export const distressTimeline = Array.from({ length: 30 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split('T')[0],
    distressScore: Math.max(0, Math.min(100, 70 - i * 1.5 + Math.random() * 20 - 10)),
    hopeIndex: Math.max(0, Math.min(100, 30 + i * 2 + Math.random() * 15 - 7)),
    safetyPerception: Math.max(0, Math.min(100, 50 + i * 1.2 + Math.random() * 10 - 5))
  };
});

export const districtStats = [
  { id: 'd1', name: 'Kalahandi', activeVictims: 145, resolvedCases: 89, avgResponseTime: '2.4 hrs', highRiskCount: 12, pendingEscalations: 3 },
  { id: 'd2', name: 'Khurda', activeVictims: 320, resolvedCases: 210, avgResponseTime: '1.2 hrs', highRiskCount: 25, pendingEscalations: 1 },
  { id: 'd3', name: 'Ganjam', activeVictims: 210, resolvedCases: 154, avgResponseTime: '1.8 hrs', highRiskCount: 18, pendingEscalations: 4 },
  { id: 'd4', name: 'Sundargarh', activeVictims: 180, resolvedCases: 112, avgResponseTime: '2.1 hrs', highRiskCount: 15, pendingEscalations: 2 },
  { id: 'd5', name: 'Cuttack', activeVictims: 275, resolvedCases: 198, avgResponseTime: '1.5 hrs', highRiskCount: 22, pendingEscalations: 0 },
  { id: 'd6', name: 'Mayurbhanj', activeVictims: 195, resolvedCases: 130, avgResponseTime: '2.7 hrs', highRiskCount: 19, pendingEscalations: 5 },
  { id: 'd7', name: 'Puri', activeVictims: 160, resolvedCases: 105, avgResponseTime: '1.9 hrs', highRiskCount: 14, pendingEscalations: 1 },
  { id: 'd8', name: 'Sambalpur', activeVictims: 150, resolvedCases: 95, avgResponseTime: '2.2 hrs', highRiskCount: 11, pendingEscalations: 2 }
];

export const counselorCaseload = [
  { id: 'c1', name: 'S. Pradhan', caseId: 'V-2024-0711', riskLevel: 'critical', lastCheckIn: '2024-03-01', trend: 'declining', nextScheduled: '2024-03-02', distressScore: 88 },
  { id: 'c2', name: 'M. Das', caseId: 'V-2024-0822', riskLevel: 'high', lastCheckIn: '2024-02-28', trend: 'stable', nextScheduled: '2024-03-03', distressScore: 75 },
  { id: 'c3', name: 'K. Sahoo', caseId: 'V-2024-0650', riskLevel: 'moderate', lastCheckIn: '2024-02-25', trend: 'improving', nextScheduled: '2024-03-05', distressScore: 55 },
  { id: 'c4', name: 'R. Mohanty', caseId: 'V-2024-0901', riskLevel: 'high', lastCheckIn: '2024-03-01', trend: 'stable', nextScheduled: '2024-03-04', distressScore: 80 },
  { id: 'c5', name: 'P. Behera', caseId: 'V-2024-0540', riskLevel: 'low', lastCheckIn: '2024-02-20', trend: 'improving', nextScheduled: '2024-03-10', distressScore: 35 },
  { id: 'c6', name: 'L. Nayak', caseId: 'V-2024-0888', riskLevel: 'critical', lastCheckIn: '2024-03-01', trend: 'declining', nextScheduled: '2024-03-01', distressScore: 92 }
];

export const escalationAlerts = [
  { id: 'e1', severity: 'critical', victimId: 'V-2024-0888', description: 'SOS triggered - Location tracking active', timeRemaining: 'Immediate', assignedTo: 'Police Control Room', district: 'Kalahandi' },
  { id: 'e2', severity: 'high', victimId: 'V-2024-0711', description: 'Missed 3 consecutive check-ins', timeRemaining: '2 hours', assignedTo: 'Sumita Das (PO)', district: 'Khurda' },
  { id: 'e3', severity: 'high', victimId: 'V-2024-0901', description: 'Reported safety concern in check-in', timeRemaining: '4 hours', assignedTo: 'Dr. Ananya Mishra', district: 'Ganjam' },
  { id: 'e4', severity: 'medium', victimId: 'V-2024-0822', description: 'Distress score increased by 20%', timeRemaining: '12 hours', assignedTo: 'Counselor queue', district: 'Cuttack' }
];

export const monthlyTrends = [
  { month: 'Jan', newCases: 45, resolved: 30, active: 150 },
  { month: 'Feb', newCases: 52, resolved: 35, active: 167 },
  { month: 'Mar', newCases: 48, resolved: 40, active: 175 },
  { month: 'Apr', newCases: 60, resolved: 45, active: 190 },
  { month: 'May', newCases: 55, resolved: 50, active: 195 },
  { month: 'Jun', newCases: 65, resolved: 55, active: 205 },
  { month: 'Jul', newCases: 70, resolved: 60, active: 215 },
  { month: 'Aug', newCases: 68, resolved: 65, active: 218 },
  { month: 'Sep', newCases: 75, resolved: 70, active: 223 },
  { month: 'Oct', newCases: 80, resolved: 75, active: 228 },
  { month: 'Nov', newCases: 85, resolved: 80, active: 233 },
  { month: 'Dec', newCases: 90, resolved: 85, active: 238 }
];
