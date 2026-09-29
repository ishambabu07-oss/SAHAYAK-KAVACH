import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)' },
  { code: 'bn', name: 'বাংলা (Bengali)' },
  { code: 'te', name: 'తెలుగు (Telugu)' }
];

const LanguageSelector = () => {
  const [selectedLang, setSelectedLang] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('sahayak_language');
    if (savedLang) {
      setSelectedLang(savedLang);
    }
  }, []);

  const handleChange = (e) => {
    const lang = e.target.value;
    setSelectedLang(lang);
    localStorage.setItem('sahayak_language', lang);
    // Further i18n logic can be hooked here
  };

  return (
    <div className="relative flex items-center">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Globe className="h-4 w-4 text-[#1C4E3D]" aria-hidden="true" />
      </div>
      <select
        value={selectedLang}
        onChange={handleChange}
        aria-label="Select language"
        className="block w-full pl-9 pr-8 py-2 text-sm text-gray-700 bg-white border border-[#1C4E3D] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:border-transparent appearance-none"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg className="h-4 w-4 text-[#1C4E3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSelector;
