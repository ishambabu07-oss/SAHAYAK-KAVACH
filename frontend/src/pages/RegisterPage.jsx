import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Shield, 
  Heart, 
  ShieldCheck, 
  Lock, 
  Phone, 
  Mail, 
  User, 
  FileText, 
  MapPin, 
  Briefcase, 
  BadgeCheck, 
  Loader2, 
  ArrowRight,
  Info
} from 'lucide-react';
import { useAuth, ROLE_VICTIM, ROLE_COUNSELOR, ROLE_OFFICER } from '../context/AuthContext';
import LanguageSelector from '../components/common/LanguageSelector';
import QuickExitButton from '../components/common/QuickExitButton';

const ODISHA_DISTRICTS = [
  'Kalahandi', 'Koraput', 'Malkangiri', 'Rayagada', 
  'Nabarangpur', 'Ganjam', 'Balangir', 'Nuapada', 
  'Mayurbhanj', 'Sundargarh', 'Sambalpur', 'Khurda'
];

const RegisterPage = () => {
  const [activeTab, setActiveTab] = useState('victim'); // 'victim' | 'authority'
  const navigate = useNavigate();
  const { registerVictim, registerAuthority } = useAuth();

  // Victim Registration State
  const [victimForm, setVictimForm] = useState({
    name: '',
    phone: '',
    district: 'Kalahandi',
    firNumber: '',
    hasFir: false,
    language: 'en',
    consent: true
  });
  const [victimStep, setVictimStep] = useState(1); // 1: Info, 2: OTP
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVictimLoading, setIsVictimLoading] = useState(false);
  const [victimError, setVictimError] = useState('');

  // Authority Registration State
  const [authorityForm, setAuthorityForm] = useState({
    name: '',
    email: '',
    role: ROLE_COUNSELOR,
    district: 'Kalahandi',
    employeeId: '',
    department: 'Department of Social Security & Empowerment',
    licenseNumber: ''
  });
  const [isAuthorityLoading, setIsAuthorityLoading] = useState(false);
  const [authorityError, setAuthorityError] = useState('');

  // Victim handlers
  const handleVictimSubmit = (e) => {
    e.preventDefault();
    setVictimError('');
    if (!victimForm.phone || victimForm.phone.length < 10) {
      setVictimError('Please enter a valid 10-digit mobile number.');
      return;
    }
    // Advance to OTP simulation
    setVictimStep(2);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`reg-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyAndRegisterVictim = async (e) => {
    e.preventDefault();
    setVictimError('');
    setIsVictimLoading(true);

    try {
      await registerVictim({
        name: victimForm.name.trim() || 'Survivor (Confidential)',
        phone: victimForm.phone,
        district: victimForm.district,
        firNumber: victimForm.hasFir ? victimForm.firNumber : 'Self-Enrolled (Pre-FIR Support)',
        language: victimForm.language
      });
      navigate('/victim/dashboard');
    } catch (err) {
      setVictimError('Registration could not be completed. Please retry.');
    } finally {
      setIsVictimLoading(false);
    }
  };

  // Authority handler
  const handleAuthorityRegister = async (e) => {
    e.preventDefault();
    setAuthorityError('');
    if (!authorityForm.email || !authorityForm.name) {
      setAuthorityError('Please fill in all mandatory fields.');
      return;
    }

    setIsAuthorityLoading(true);
    try {
      await registerAuthority({
        name: authorityForm.name,
        email: authorityForm.email,
        role: authorityForm.role,
        district: authorityForm.district,
        employeeId: authorityForm.employeeId || `EMP-${Date.now().toString().slice(-4)}`
      });
      navigate('/authority/dashboard');
    } catch (err) {
      setAuthorityError('Empanelment registration failed. Please contact state administrator.');
    } finally {
      setIsAuthorityLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col justify-between text-[#1F2937] font-sans antialiased relative selection:bg-[#2D6A4F] selection:text-white">
      {/* Top Header / Language Switcher */}
      <header className="w-full px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1C4E3D] flex items-center justify-center text-white shadow-sm">
            <Shield className="w-6 h-6 text-[#E0A96D]" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#1C4E3D]">सहायक कवच</h1>
            <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">Sahayak Kavach</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSelector />
        </div>
      </header>

      {/* Main Registration Card Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
          
          {/* Dual Portal Header Switcher */}
          <div className="grid grid-cols-2 border-b border-gray-100 bg-[#F3F6F4]/50 p-1.5 m-2 rounded-2xl">
            <button
              type="button"
              onClick={() => { setActiveTab('victim'); setVictimError(''); }}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'victim'
                  ? 'bg-white text-[#1C4E3D] shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Heart className={`w-4 h-4 ${activeTab === 'victim' ? 'text-[#2D6A4F]' : 'text-gray-400'}`} />
              <span>Victim Enrollment</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('authority'); setAuthorityError(''); }}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'authority'
                  ? 'bg-[#1C4E3D] text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Authority Empanelment</span>
            </button>
          </div>

          <div className="p-8">
            {/* ===================== TAB 1: VICTIM REGISTRATION ===================== */}
            {activeTab === 'victim' && (
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#2D6A4F] text-xs font-semibold mb-3">
                    <Lock className="w-3.5 h-3.5" />
                    <span>DPDP Act 2023 Protected · Zero-Barrier Access</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Register for Safe Monitoring</h2>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    Under the SC/ST (Prevention of Atrocities) Act, you have an unassailable legal right to protection, psychological healing, and state support.
                  </p>
                </div>

                {victimError && (
                  <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-sm flex items-start gap-3">
                    <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>{victimError}</span>
                  </div>
                )}

                {victimStep === 1 ? (
                  <form onSubmit={handleVictimSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Name or Preferred Alias <span className="text-gray-400 font-normal">(Optional for privacy)</span>
                      </label>
                      <div className="relative">
                        <User className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={victimForm.name}
                          onChange={(e) => setVictimForm({ ...victimForm, name: e.target.value })}
                          placeholder="e.g. Maya or leave blank to stay anonymous"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:border-transparent text-sm transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Registered Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">+91</span>
                        <input
                          type="tel"
                          required
                          maxLength="10"
                          value={victimForm.phone}
                          onChange={(e) => setVictimForm({ ...victimForm, phone: e.target.value.replace(/\D/g, '') })}
                          placeholder="10-digit mobile number"
                          className="w-full pl-14 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:border-transparent text-sm transition"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">We will send a one-time verification code via SMS.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                          District / Police Jurisdiction
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <select
                            value={victimForm.district}
                            onChange={(e) => setVictimForm({ ...victimForm, district: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-sm bg-white"
                          >
                            {ODISHA_DISTRICTS.map((d) => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                          Preferred Language
                        </label>
                        <select
                          value={victimForm.language}
                          onChange={(e) => setVictimForm({ ...victimForm, language: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-sm bg-white"
                        >
                          <option value="en">English</option>
                          <option value="hi">हिन्दी (Hindi)</option>
                          <option value="od">ଓଡ଼ିଆ (Odia)</option>
                          <option value="te">తెలుగు (Telugu)</option>
                        </select>
                      </div>
                    </div>

                    {/* FIR toggle */}
                    <div className="p-4 bg-[#F8FAF9] rounded-2xl border border-gray-100">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={victimForm.hasFir}
                          onChange={(e) => setVictimForm({ ...victimForm, hasFir: e.target.checked })}
                          className="w-4 h-4 rounded text-[#2D6A4F] focus:ring-[#2D6A4F] accent-[#2D6A4F]"
                        />
                        <span className="text-xs font-semibold text-gray-700">I already have an FIR / Atrocity Case Number</span>
                      </label>
                      {victimForm.hasFir && (
                        <div className="mt-3 relative">
                          <FileText className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={victimForm.firNumber}
                            onChange={(e) => setVictimForm({ ...victimForm, firNumber: e.target.value })}
                            placeholder="e.g. FIR/2026/KLD/049"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                          />
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-2xl bg-[#1C4E3D] hover:bg-[#163D30] text-white font-semibold text-sm transition shadow-sm flex items-center justify-center gap-2 group"
                    >
                      <span>Proceed to Instant Verification</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </form>
                ) : (
                  /* Step 2: OTP Verification */
                  <form onSubmit={handleVerifyAndRegisterVictim} className="space-y-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        We sent a 6-digit verification code to <span className="font-semibold text-gray-900">+91 {victimForm.phone}</span>
                      </p>
                      <button
                        type="button"
                        onClick={() => setVictimStep(1)}
                        className="text-xs text-[#2D6A4F] hover:underline font-semibold mt-1"
                      >
                        Change number
                      </button>
                    </div>

                    <div className="flex justify-center gap-2 sm:gap-3">
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`reg-otp-${idx}`}
                          type="text"
                          inputMode="numeric"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] bg-white shadow-sm"
                        />
                      ))}
                    </div>

                    <div className="text-center text-xs text-gray-500">
                      Demo verification: enter any 6 digits (or <span className="font-semibold text-gray-700">123456</span>)
                    </div>

                    <button
                      type="submit"
                      disabled={isVictimLoading}
                      className="w-full py-3.5 px-6 rounded-2xl bg-[#1C4E3D] hover:bg-[#163D30] text-white font-semibold text-sm transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isVictimLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Creating Secure Profile...</span>
                        </>
                      ) : (
                        <>
                          <BadgeCheck className="w-5 h-5 text-[#E0A96D]" />
                          <span>Complete Enrolment & Enter Portal</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>Already enrolled?</span>
                  <Link to="/login" className="font-semibold text-[#1C4E3D] hover:underline">
                    Sign in to your portal →
                  </Link>
                </div>
              </div>
            )}

            {/* ===================== TAB 2: AUTHORITY REGISTRATION ===================== */}
            {activeTab === 'authority' && (
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1C4E3D]" />
                    <span>Official Credential Onboarding</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Authority & Counselor Empanelment</h2>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    Empanel your certified clinical or administrative credentials for jurisdiction-specific monitoring and high-risk SLA intervention.
                  </p>
                </div>

                {authorityError && (
                  <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-sm">
                    {authorityError}
                  </div>
                )}

                <form onSubmit={handleAuthorityRegister} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Full Legal Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={authorityForm.name}
                        onChange={(e) => setAuthorityForm({ ...authorityForm, name: e.target.value })}
                        placeholder="e.g. Dr. Ananya Mishra"
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1C4E3D] text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Official Government / Institutional Email <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={authorityForm.email}
                        onChange={(e) => setAuthorityForm({ ...authorityForm, email: e.target.value })}
                        placeholder="officer@odisha.gov.in or counselor@health.org"
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1C4E3D] text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Role / Designation
                      </label>
                      <div className="relative">
                        <Briefcase className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select
                          value={authorityForm.role}
                          onChange={(e) => setAuthorityForm({ ...authorityForm, role: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1C4E3D] text-sm bg-white"
                        >
                          <option value={ROLE_COUNSELOR}>Certified Psychological Counselor</option>
                          <option value={ROLE_OFFICER}>District Welfare Officer (DWO)</option>
                          <option value={ROLE_OFFICER}>State Nodal Officer</option>
                          <option value={ROLE_OFFICER}>Special Court Liaison Officer</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Jurisdiction District
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select
                          value={authorityForm.district}
                          onChange={(e) => setAuthorityForm({ ...authorityForm, district: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1C4E3D] text-sm bg-white"
                        >
                          {ODISHA_DISTRICTS.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Employee ID / RCI License No.
                    </label>
                    <input
                      type="text"
                      value={authorityForm.employeeId}
                      onChange={(e) => setAuthorityForm({ ...authorityForm, employeeId: e.target.value })}
                      placeholder="e.g. GOV-DWO-2024-88 or RCI/PSY/1209"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1C4E3D] text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isAuthorityLoading}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#1C4E3D] hover:bg-[#163D30] text-white font-semibold text-sm transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
                  >
                    {isAuthorityLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying Empanelment...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-[#E0A96D]" />
                        <span>Register & Request Access</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>Already have official credentials?</span>
                  <Link to="/login" className="font-semibold text-[#1C4E3D] hover:underline">
                    Officer Sign In →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating Emergency Exit */}
      <QuickExitButton />

      {/* Reassuring Footer */}
      <footer className="w-full py-4 text-center text-xs text-gray-500 border-t border-gray-100">
        Sahayak Kavach · Statutory Psychological Welfare Protection System under the SC/ST (Prevention of Atrocities) Act
      </footer>
    </div>
  );
};

export default RegisterPage;

