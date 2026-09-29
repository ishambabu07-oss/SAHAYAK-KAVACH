import React, { useState } from 'react';
import { Mic, MicOff, ChevronRight, ChevronLeft, Check } from 'lucide-react';

const categoryColors = {
  emotional: 'bg-purple-100 text-purple-700',
  safety: 'bg-red-100 text-red-700',
  support: 'bg-blue-100 text-blue-700',
  'daily-functioning': 'bg-green-100 text-green-700',
};

const AdaptiveQuestionCard = ({ 
  question, 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrev, 
  onSubmit, 
  onAnswer, 
  currentAnswer 
}) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleTextChange = (e) => {
    onAnswer(e.target.value);
  };

  const handleScaleSelect = (value) => {
    onAnswer(value);
  };

  const handleChoiceSelect = (choice) => {
    onAnswer(choice);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const isLastQuestion = currentStep === totalSteps;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 max-w-2xl mx-auto border border-gray-100 w-full">
      {/* Top section: Category & Empathy */}
      <div className="mb-6 flex flex-col items-center text-center space-y-4">
        <span className={`px-4 py-1 rounded-full text-sm font-medium capitalize ${categoryColors[question.category] || 'bg-gray-100 text-gray-700'}`}>
          {question.category.replace('-', ' ')}
        </span>
        {question.empathyMessage && (
          <p className="italic text-[#1C4E3D] text-sm md:text-base">
            "{question.empathyMessage}"
          </p>
        )}
      </div>

      {/* Question Text */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-8">
        {question.text}
      </h2>

      {/* Response Area */}
      <div className="mb-10 min-h-[120px] flex items-center justify-center w-full">
        {question.responseType === 'text' && (
          <div className="w-full relative">
            <textarea
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1C4E3D] focus:border-[#1C4E3D] outline-none resize-none"
              rows="4"
              placeholder="Type your response here..."
              value={currentAnswer || ''}
              onChange={handleTextChange}
            />
            <div className="absolute bottom-4 right-4 flex items-center space-x-2">
              <button 
                onClick={toggleRecording}
                className={`p-2 rounded-full transition-colors ${isRecording ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                title="Record audio"
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              {isRecording && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>}
            </div>
          </div>
        )}

        {question.responseType === 'scale' && (
          <div className="flex justify-between w-full max-w-md mx-auto">
            {[
              { val: 1, emoji: '😢' },
              { val: 2, emoji: '😟' },
              { val: 3, emoji: '😐' },
              { val: 4, emoji: '🙂' },
              { val: 5, emoji: '😊' }
            ].map((item) => (
              <button
                key={item.val}
                onClick={() => handleScaleSelect(item.val)}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-3xl transition-all duration-200 
                  ${currentAnswer === item.val 
                    ? 'bg-[#1C4E3D] bg-opacity-10 ring-4 ring-[#1C4E3D] ring-opacity-50 transform scale-110' 
                    : 'bg-gray-50 hover:bg-gray-100 grayscale hover:grayscale-0'}`}
              >
                {item.emoji}
              </button>
            ))}
          </div>
        )}

        {question.responseType === 'choice' && (
          <div className="grid grid-cols-1 gap-4 w-full">
            {question.options?.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleChoiceSelect(option)}
                className={`p-4 rounded-xl border text-left transition-colors duration-200 flex items-center justify-between
                  ${currentAnswer === option 
                    ? 'bg-[#F3F6F4] border-[#2D6A4F] text-[#1C4E3D] font-medium' 
                    : 'border-gray-200 text-gray-700 hover:border-[#1C4E3D] hover:bg-gray-50'}`}
              >
                <span>{option}</span>
                {currentAnswer === option && <Check className="w-5 h-5 text-[#2D6A4F]" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Progress and Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <button
          onClick={onPrev}
          disabled={currentStep === 1}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors
            ${currentStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <div className="text-sm font-medium text-gray-500">
          Question {currentStep} of {totalSteps}
        </div>

        {!isLastQuestion ? (
          <button
            onClick={onNext}
            disabled={!currentAnswer && question.responseType !== 'text'}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors
              ${!currentAnswer && question.responseType !== 'text' 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-[#1C4E3D] text-white hover:bg-[#2D6A4F]'}`}
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={onSubmit}
            disabled={!currentAnswer && question.responseType !== 'text'}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors
              ${!currentAnswer && question.responseType !== 'text' 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-[#E0A96D] text-white hover:bg-[#D4985C]'}`}
          >
            <span>Submit</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default AdaptiveQuestionCard;
