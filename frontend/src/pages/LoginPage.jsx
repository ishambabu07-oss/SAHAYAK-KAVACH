import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { 
  Shield, 
  Heart, 
  ShieldCheck, 
  Lock, 
  Phone, 
  Mail, 
  Eye, 
  EyeOff, 
  KeyRound, 
  Loader2,
  ChevronDown
} from 'lucide-react';
import { useAuth, ROLE_VICTIM } from '../context/AuthContext';
import LanguageSelector from '../components/common/LanguageSelector';
import QuickExitButton from '../components/common/QuickExitButton';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('victim'); // 'victim' or 'authority'
  const navigate = useNavigate();
  const { loginVictim, loginAuthority, loginDemo, isAuthenticated, user, isLoading } = useAuth();
  const [demoLoading, setDemoLoading] = useState(null);

  // Tab 1: Victim State
  const [mobileNumber, setMobileNumber] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(0);
  const [victimError, setVictimError] = useState('');
  const [isVictimLoading, setIsVictimLoading] = useState(false);
  const otpInputRefs = useRef([]);
  const mobileInputRef = useRef(null);

  // Tab 2: Authority State
  const [authForm, setAuthForm] = useState({
    emailId: '',
    password: '',
    role: '',
    district: '',
    twoFaCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const emailInputRef = useRef(null);

  const districts = ['Kalahandi', 'Koraput', 'Malkangiri', 'Rayagada', 'Nabarangpur', 'Ganjam', 'Balangir', 'Nuapada'];
  const roles = ['District Welfare Officer', 'State Nodal Officer', 'Certified Counselor', 'Block Development Officer'];

  // Handle auto-focus on tab switch
  useEffect(() => {
    if (activeTab === 'victim' && !isOtpSent && mobileInputRef.current) {
      mobileInputRef.current.focus();
    } else if (activeTab === 'authority' && emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [activeTab, isOtpSent]);

  // Handle OTP timer
  useEffect(() => {
    let interval = null;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [otpTimer]);

  const handleDemoLogin = async (accountKey, path) => {
    setDemoLoading(accountKey);
    setVictimError('');
    setAuthError('');
    try {
      await loginDemo(accountKey);
      navigate(path);
    } catch (err) {
      setAuthError('Demo login failed. Please try again.');
    } finally {
      setDemoLoading(null);
    }
  };

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    setVictimError('');
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobileNumber)) {
      setVictimError('Please enter a valid 10-digit mobile number.');
      return;
    }
    
    setIsVictimLoading(true);
    // Simulate sending OTP
    setTimeout(() => {
      setIsVictimLoading(false);
      setIsOtpSent(true);
      setOtpTimer(30);
      // Auto-focus first OTP field
      setTimeout(() => {
        if (otpInputRefs.current[0]) otpInputRefs.current[0].focus();
      }, 50);
    }, 1000);
  };

  const handleOtpChange = (index, value) => {
    // Allow only numbers
    if (value && !/^[0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5 && otpInputRefs.current[index + 1]) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0 && otpInputRefs.current[index - 1]) {
        otpInputRefs.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleVictimLogin = async (e) => {
    e.preventDefault();
    setVictimError('');
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setVictimError('Please enter all 6 digits of the OTP.');
      return;
    }

    setIsVictimLoading(true);
    try {
      await loginVictim(mobileNumber, otpValue);
      navigate('/victim/dashboard');
    } catch (err) {
      setVictimError('Invalid OTP. Please try again.');
    } finally {
      setIsVictimLoading(false);
    }
  };

  const handleResendOtp = () => {
    setOtp(['', '', '', '', '', '']);
    setOtpTimer(30);
    if (otpInputRefs.current[0]) otpInputRefs.current[0].focus();
    // Logic to actually resend OTP can be added here
  };

  const handleAuthorityChange = (e) => {
    const { name, value } = e.target;
    setAuthForm((prev) => ({ ...prev, [name]: value }));
    if (authError) setAuthError('');
  };

  const handleAuthoritySubmit = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (!authForm.emailId || !authForm.password || !authForm.role || !authForm.district || !authForm.twoFaCode) {
      setAuthError('Please fill in all required fields.');
      return;
    }

    if (authForm.twoFaCode.length !== 6 || !/^[0-9]+$/.test(authForm.twoFaCode)) {
      setAuthError('Please enter a valid 6-digit 2FA code.');
      return;
    }

    setIsAuthLoading(true);
    try {
      await loginAuthority(authForm);
      navigate('/authority/dashboard');
    } catch (err) {
      setAuthError('Invalid credentials. Please verify your details.');
    } finally {
      setIsAuthLoading(false);
    }
  };

  if (!isLoading && isAuthenticated && user) {
    const dest = user.role === ROLE_VICTIM ? '/victim/dashboard' : '/authority/dashboard';
    return <Navigate to={dest} replace />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {activeTab === 'victim' && (
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8">
          <QuickExitButton />
        </div>
      )}

      {/* Header Area */}
      <div className="text-center mb-8 flex flex-col items-center space-y-4">
        <div className="w-20 h-20 bg-[#1C4E3D] rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-105">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-[#1C4E3D] tracking-tight">Sahayak Kavach</h1>
          <p className="text-[#2D6A4F] mt-2 font-medium max-w-md mx-auto text-sm sm:text-base leading-relaxed">
            AI-Powered Protection Under SC/ST (Prevention of Atrocities) Act
          </p>
        </div>
      </div>

      <div className="w-full max-w-md mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
        <p className="font-semibold">Preview mode — no backend yet</p>
        <p className="mt-1 text-xs text-amber-800">
          Use a demo button, or any 10-digit phone + OTP <span className="font-mono font-semibold">123456</span>.
          Authority: any email/password, 2FA <span className="font-mono font-semibold">123456</span>.
        </p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            disabled={!!demoLoading}
            onClick={() => handleDemoLogin('victim', '/victim/dashboard')}
            className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-[#2D6A4F] border border-emerald-200 hover:bg-emerald-50 disabled:opacity-60"
          >
            {demoLoading === 'victim' ? 'Entering…' : 'Demo survivor'}
          </button>
          <button
            type="button"
            disabled={!!demoLoading}
            onClick={() => handleDemoLogin('counselor', '/authority/dashboard')}
            className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-[#1C4E3D] border border-emerald-200 hover:bg-emerald-50 disabled:opacity-60"
          >
            {demoLoading === 'counselor' ? 'Entering…' : 'Demo counselor'}
          </button>
          <button
            type="button"
            disabled={!!demoLoading}
            onClick={() => handleDemoLogin('officer', '/authority/dashboard')}
            className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-[#1C4E3D] border border-emerald-200 hover:bg-emerald-50 disabled:opacity-60"
          >
            {demoLoading === 'officer' ? 'Entering…' : 'Demo officer'}
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('victim')}
            className={`flex-1 py-4 text-sm font-semibold transition-colors duration-200 relative ${
              activeTab === 'victim' ? 'text-[#38A169]' : 'text-gray-500 hover:text-gray-700'
            }`}
            aria-selected={activeTab === 'victim'}
            role="tab"
          >
            Safe Access
            {activeTab === 'victim' && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#38A169] rounded-t-md transition-all duration-300" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('authority')}
            className={`flex-1 py-4 text-sm font-semibold transition-colors duration-200 relative ${
              activeTab === 'authority' ? 'text-[#1C4E3D]' : 'text-gray-500 hover:text-gray-700'
            }`}
            aria-selected={activeTab === 'authority'}
            role="tab"
          >
            Authority Portal
            {activeTab === 'authority' && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1C4E3D] rounded-t-md transition-all duration-300" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          
          {/* ---------------- VICTIM TAB ---------------- */}
          {activeTab === 'victim' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-[#38A169]" fill="#38A169" />
                  <h2 className="text-xl font-bold text-gray-800">Welcome to Your Safe Space</h2>
                </div>
                <LanguageSelector />
              </div>

              <div className="bg-[#F3F6F4] rounded-lg p-3 mb-6 flex items-start space-x-3 border border-[#E2E8F0]">
                <Lock className="w-5 h-5 text-[#38A169] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 leading-tight">
                  Your identity is strictly encrypted under DPDP Act 2023. This is a zero-barrier, confidential portal.
                </p>
              </div>

              {!isOtpSent ? (
                <form onSubmit={handleMobileSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none border-r border-gray-300 pr-2">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-500 ml-1 text-sm font-medium">+91</span>
                      </div>
                      <input
                        ref={mobileInputRef}
                        type="tel"
                        id="mobile"
                        name="mobile"
                        maxLength="10"
                        className="pl-20 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-[#38A169] focus:border-[#38A169] sm:text-sm py-3 border"
                        placeholder="Enter 10-digit number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        aria-invalid={!!victimError}
                      />
                    </div>
                    {victimError && <p className="mt-2 text-sm text-red-600">{victimError}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={isVictimLoading || mobileNumber.length !== 10}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#38A169] hover:bg-[#2F855A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38A169] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                  >
                    {isVictimLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send OTP'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVictimLogin} className="space-y-6 animate-in fade-in slide-in-from-right-2">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Enter Verification Code</label>
                      <button 
                        type="button" 
                        onClick={() => setIsOtpSent(false)} 
                        className="text-xs text-[#38A169] hover:underline"
                      >
                        Change Number
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">
                      Code sent to +91 {mobileNumber}. Demo OTP: <span className="font-semibold text-gray-700">123456</span>
                    </p>
                    
                    <div className="flex justify-between space-x-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (otpInputRefs.current[index] = el)}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg border-gray-300 focus:border-[#38A169] focus:ring focus:ring-[#38A169] focus:ring-opacity-20 transition-all outline-none"
                          aria-label={`Digit ${index + 1}`}
                        />
                      ))}
                    </div>
                    {victimError && <p className="mt-2 text-sm text-red-600">{victimError}</p>}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {otpTimer > 0 ? `Resend in 00:${otpTimer.toString().padStart(2, '0')}` : ''}
                    </span>
                    <button
                      type="button"
                      disabled={otpTimer > 0}
                      onClick={handleResendOtp}
                      className={`text-sm font-medium ${
                        otpTimer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#38A169] hover:text-[#2F855A]'
                      }`}
                    >
                      Resend OTP
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isVictimLoading || otp.join('').length !== 6}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#38A169] hover:bg-[#2F855A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38A169] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                  >
                    {isVictimLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify & Enter Safely'}
                  </button>
                </form>
              )}

              <div className="mt-8 text-center border-t border-gray-100 pt-6">
                <p className="text-sm text-gray-600 font-medium">You are not alone. Help is always available.</p>
                <div className="mt-2 flex items-center justify-center space-x-2 text-[#C05621] font-bold text-lg bg-orange-50 py-2 rounded-lg">
                  <Phone className="w-5 h-5" />
                  <span>Helpline: 181</span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>Need to enroll for monitoring?</span>
                  <Link to="/register" className="font-semibold text-[#2D6A4F] hover:underline">
                    Register for Safe Access →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- AUTHORITY TAB ---------------- */}
          {activeTab === 'authority' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center space-x-2 mb-6">
                <ShieldCheck className="w-6 h-6 text-[#1C4E3D]" />
                <h2 className="text-xl font-bold text-gray-800">Authorized Personnel Access</h2>
              </div>

              <form onSubmit={handleAuthoritySubmit} className="space-y-4">
                <div>
                  <label htmlFor="emailId" className="block text-sm font-medium text-gray-700 mb-1">
                    Email / Gov ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      ref={emailInputRef}
                      type="text"
                      id="emailId"
                      name="emailId"
                      className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-[#1C4E3D] focus:border-[#1C4E3D] sm:text-sm py-2.5 border"
                      placeholder="e.g. officer@gov.in"
                      value={authForm.emailId}
                      onChange={handleAuthorityChange}
                      aria-invalid={!!authError && !authForm.emailId}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      className="pl-3 pr-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-[#1C4E3D] focus:border-[#1C4E3D] sm:text-sm py-2.5 border"
                      placeholder="••••••••"
                      value={authForm.password}
                      onChange={handleAuthorityChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <div className="relative">
                      <select
                        id="role"
                        name="role"
                        className="block w-full pl-3 pr-10 py-2.5 text-sm border-gray-300 focus:outline-none focus:ring-[#1C4E3D] focus:border-[#1C4E3D] rounded-lg border appearance-none bg-white"
                        value={authForm.role}
                        onChange={handleAuthorityChange}
                      >
                        <option value="" disabled>Select Role</option>
                        {roles.map((role) => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                      District
                    </label>
                    <div className="relative">
                      <select
                        id="district"
                        name="district"
                        className="block w-full pl-3 pr-10 py-2.5 text-sm border-gray-300 focus:outline-none focus:ring-[#1C4E3D] focus:border-[#1C4E3D] rounded-lg border appearance-none bg-white"
                        value={authForm.district}
                        onChange={handleAuthorityChange}
                      >
                        <option value="" disabled>Select District</option>
                        {districts.map((district) => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="twoFaCode" className="block text-sm font-medium text-gray-700 mb-1">
                    2FA Authorization Code
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <KeyRound className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="twoFaCode"
                      name="twoFaCode"
                      maxLength="6"
                      className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-[#1C4E3D] focus:border-[#1C4E3D] sm:text-sm py-2.5 border"
                      placeholder="6-digit PIN"
                      value={authForm.twoFaCode}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        handleAuthorityChange({ target: { name: 'twoFaCode', value: val }});
                      }}
                    />
                  </div>
                </div>

                {authError && <p className="text-sm text-red-600 mt-2">{authError}</p>}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isAuthLoading}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#1C4E3D] hover:bg-[#2D6A4F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1C4E3D] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                  >
                    {isAuthLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Secure Login'}
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center border-t border-gray-100 pt-6">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Government of Odisha <br />
                  Department of Social Security & Empowerment of Persons with Disabilities
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>New Counselor or Officer?</span>
                  <Link to="/register" className="font-semibold text-[#1C4E3D] hover:underline">
                    Request Empanelment →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
