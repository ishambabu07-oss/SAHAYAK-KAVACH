import React, { createContext, useContext, useState } from 'react';

const CheckInContext = createContext();

const generateMockHistory = () => {
  const history = [];
  const today = new Date();
  
  const sentiments = ['positive', 'neutral', 'negative', 'distressed'];
  const scores = [85, 78, 65, 70, 80, 82, 75, 60, 55, 65, 72, 78, 85, 88];
  
  for (let i = 13; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const score = scores[13 - i];
    let sentiment = 'neutral';
    
    if (score >= 80) sentiment = 'positive';
    else if (score >= 65) sentiment = 'neutral';
    else if (score >= 50) sentiment = 'negative';
    else sentiment = 'distressed';
    
    history.push({
      id: `ci-${13-i}`,
      date: date.toISOString(),
      score: score,
      sentiment: sentiment,
      completed: true
    });
  }
  return history;
};

export const CheckInProvider = ({ children }) => {
  const [currentCheckIn, setCurrentCheckIn] = useState(null);
  const [checkInHistory, setCheckInHistory] = useState(generateMockHistory());
  const [isCheckInActive, setIsCheckInActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [communicationPreferences, setCommunicationPreferences] = useState({ channel: 'ivrs', timeSlot: 'Evening 6:00 PM', safetyKey: '..' });
  const [callbackRequest, setCallbackRequest] = useState(null);
  const [fieldDispatches, setFieldDispatches] = useState({});

  const requestCallback = () => setCallbackRequest({ status: 'Counselor assigned', requestedAt: new Date().toISOString(), eta: 'within 30 mins' });
  const updateCommunicationPreferences = (updates) => setCommunicationPreferences((current) => ({ ...current, ...updates }));
  const updateFieldDispatch = (token, status) => setFieldDispatches((current) => ({ ...current, [token]: status }));

  const startCheckIn = () => {
    setIsCheckInActive(true);
    setCurrentQuestionIndex(0);
    setCurrentCheckIn({
      id: `ci-new-${Date.now()}`,
      startTime: new Date().toISOString(),
      responses: [],
      completed: false
    });
  };

  const submitResponse = (questionId, response) => {
    if (!currentCheckIn) return;
    
    const updatedResponses = [...(currentCheckIn.responses || []), { questionId, response, time: new Date().toISOString() }];
    setCurrentCheckIn({ ...currentCheckIn, responses: updatedResponses });
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const completeCheckIn = () => {
    if (!currentCheckIn) return null;
    
    // Calculate mock score
    const newScore = Math.floor(Math.random() * 40) + 50; // Random score between 50 and 90
    
    const completedCheckIn = {
      ...currentCheckIn,
      endTime: new Date().toISOString(),
      completed: true,
      score: newScore,
      sentiment: newScore >= 75 ? 'positive' : newScore >= 60 ? 'neutral' : 'negative'
    };
    
    setCurrentCheckIn(null);
    setIsCheckInActive(false);
    setCurrentQuestionIndex(0);
    setCheckInHistory([...checkInHistory, completedCheckIn]);
    
    return completedCheckIn;
  };

  const getWellbeingTrend = () => {
    if (checkInHistory.length < 2) return 'stable';
    const recent = checkInHistory[checkInHistory.length - 1].score;
    const previous = checkInHistory[checkInHistory.length - 2].score;
    
    if (recent > previous + 5) return 'improving';
    if (recent < previous - 5) return 'declining';
    return 'stable';
  };

  return (
    <CheckInContext.Provider value={{
      currentCheckIn,
      checkInHistory,
      isCheckInActive,
      currentQuestionIndex,
      startCheckIn,
      submitResponse,
      completeCheckIn,
      getWellbeingTrend
      , communicationPreferences
      , updateCommunicationPreferences
      , callbackRequest
      , requestCallback
      , fieldDispatches
      , updateFieldDispatch
    }}>
      {children}
    </CheckInContext.Provider>
  );
};

export const useCheckIn = () => {
  const context = useContext(CheckInContext);
  if (!context) {
    throw new Error('useCheckIn must be used within a CheckInProvider');
  }
  return context;
};
