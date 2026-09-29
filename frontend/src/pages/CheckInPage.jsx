import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Activity, ArrowRight, CheckCircle } from 'lucide-react';
import AdaptiveQuestionCard from '../components/checkin/AdaptiveQuestionCard';
import QuickExitButton from '../components/common/QuickExitButton';
import { useCheckIn } from '../context/CheckInContext';

// Mock Data
const mockQuestions = [
  {
    id: 'q1',
    category: 'emotional',
    empathyMessage: 'Take your time. There are no wrong answers here.',
    text: 'How have you been feeling overall over the past few days?',
    responseType: 'scale'
  },
  {
    id: 'q2',
    category: 'safety',
    empathyMessage: 'Your safety is our top priority.',
    text: 'Do you feel safe in your current environment?',
    responseType: 'choice',
    options: ['Yes, completely', 'Mostly, but sometimes I worry', 'No, I feel unsafe', 'I prefer not to answer']
  },
  {
    id: 'q3',
    category: 'daily-functioning',
    empathyMessage: 'It\'s okay if things are feeling overwhelming.',
    text: 'Is there anything specific on your mind you would like to share today?',
    responseType: 'text'
  }
];

const CheckInPage = () => {
  const navigate = useNavigate();
  // Using context if available, otherwise fallback to local mock submission
  const checkInContext = useCheckIn();
  
  const [stage, setStage] = useState('intro'); // intro, questions, completed
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleStart = () => setStage('questions');

  const handleAnswer = (val) => {
    setAnswers(prev => ({ ...prev, [mockQuestions[currentIdx].id]: val }));
  };

  const handleNext = () => {
    if (currentIdx < mockQuestions.length - 1) {
      setCurrentIdx(curr => curr + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(curr => curr - 1);
    }
  };

  const handleSubmit = () => {
    if (checkInContext?.submitResponse) {
      checkInContext.submitResponse(answers);
    }
    setStage('completed');
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col items-center justify-center p-4 relative">
      <QuickExitButton />

      {stage === 'intro' && (
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-sm text-center">
          <div className="w-24 h-24 mx-auto bg-[#1C4E3D] bg-opacity-10 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <Heart className="w-10 h-10 text-[#1C4E3D]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Let's check in with you</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Take a deep breath. This is a safe space just for you. We have a few short questions to understand how to best support you today.
          </p>
          <button 
            onClick={handleStart}
            className="w-full py-4 bg-[#1C4E3D] hover:bg-[#2D6A4F] text-white rounded-xl font-medium text-lg transition-colors flex items-center justify-center space-x-2"
          >
            <span>Begin when you're ready</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {stage === 'questions' && (
        <div className="w-full max-w-2xl">
          {/* Stepper */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            {mockQuestions.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIdx ? 'w-8 bg-[#1C4E3D]' : 
                  idx < currentIdx ? 'w-4 bg-[#2D6A4F] bg-opacity-50' : 'w-4 bg-gray-200'
                }`}
              />
            ))}
          </div>
          
          <AdaptiveQuestionCard
            question={mockQuestions[currentIdx]}
            currentStep={currentIdx + 1}
            totalSteps={mockQuestions.length}
            onNext={handleNext}
            onPrev={handlePrev}
            onSubmit={handleSubmit}
            onAnswer={handleAnswer}
            currentAnswer={answers[mockQuestions[currentIdx].id]}
          />
        </div>
      )}

      {stage === 'completed' && (
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-sm text-center">
          <CheckCircle className="w-16 h-16 text-[#38A169] mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank you for sharing</h2>
          <p className="text-gray-600 mb-8">
            Your responses have been securely saved. We're proud of you for taking this step today to prioritize your wellbeing.
          </p>
          
          <div className="bg-[#F3F6F4] rounded-2xl p-6 mb-8 flex items-center justify-center space-x-4">
            <Activity className="w-8 h-8 text-[#1C4E3D]" />
            <div className="text-left">
              <p className="text-sm text-gray-600 font-medium">Wellbeing Trend</p>
              <p className="text-lg font-bold text-[#1C4E3D]">Stable & Positive</p>
            </div>
          </div>

          <button 
            onClick={() => navigate('/victim/dashboard')}
            className="w-full py-4 border-2 border-[#1C4E3D] text-[#1C4E3D] hover:bg-[#1C4E3D] hover:text-white rounded-xl font-medium text-lg transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckInPage;
