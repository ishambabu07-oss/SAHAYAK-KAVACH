import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const ROLE_VICTIM = 'ROLE_VICTIM';
export const ROLE_COUNSELOR = 'ROLE_COUNSELOR';
export const ROLE_OFFICER = 'ROLE_OFFICER';
export const ROLE_DISTRICT_OFFICER = 'ROLE_DISTRICT_OFFICER';
export const ROLE_STATE_NODAL = 'ROLE_STATE_NODAL';

export const DEMO_ACCOUNTS = {
  victim: {
    id: 'V-2026-0847',
    name: 'Survivor (Confidential)',
    role: ROLE_VICTIM,
    phone: '9876543210',
    district: 'Kalahandi',
    language: 'en',
    token: 'mock-jwt-victim-demo',
  },
  counselor: {
    id: 'OFF-KLD-001',
    name: 'Dr. Ananya Mishra',
    role: ROLE_COUNSELOR,
    email: 'counselor@odisha.gov.in',
    district: 'Kalahandi',
    token: 'mock-jwt-counselor-demo',
  },
  officer: {
    id: 'OFF-KLD-002',
    name: 'Officer Rajan Naik',
    role: ROLE_OFFICER,
    email: 'officer@odisha.gov.in',
    district: 'Kalahandi',
    token: 'mock-jwt-officer-demo',
  },
};

const persistSession = (setUser, setIsAuthenticated, account) => {
  setUser(account);
  setIsAuthenticated(true);
  localStorage.setItem('sahayak_user', JSON.stringify(account));
  localStorage.setItem('sahayak_token', account.token);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token in localStorage
    const storedUser = localStorage.getItem('sahayak_user');
    const storedToken = localStorage.getItem('sahayak_token');

    if (storedUser && storedToken) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem('sahayak_user');
        localStorage.removeItem('sahayak_token');
      }
    }

    setIsLoading(false);
  }, []);

  const loginDemo = async (accountKey) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const account = DEMO_ACCOUNTS[accountKey];
    if (!account) {
      setIsLoading(false);
      throw new Error('Unknown demo account');
    }

    persistSession(setUser, setIsAuthenticated, account);
    setIsLoading(false);
    return { success: true, user: account };
  };

  const loginVictim = async (phone, otp) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check local registered victims
    const registered = JSON.parse(localStorage.getItem('sahayak_registered_victims') || '[]');
    const matched = registered.find((v) => v.phone === phone);

    const isValid = matched || !otp || otp === '123456' || otp.length === 6;

    if (isValid) {
      const mockVictimUser = matched || {
        id: 'V-2026-0847',
        name: 'Survivor (Confidential)',
        role: ROLE_VICTIM,
        phone: phone || '9876543210',
        district: 'Kalahandi',
        language: 'en',
        token: 'mock-jwt-victim',
      };

      setUser(mockVictimUser);
      setIsAuthenticated(true);
      localStorage.setItem('sahayak_user', JSON.stringify(mockVictimUser));
      localStorage.setItem('sahayak_token', mockVictimUser.token || 'mock-jwt-victim');
      setIsLoading(false);
      return { success: true, user: mockVictimUser };
    }

    setIsLoading(false);
    throw new Error('Invalid phone or OTP. (Demo OTP is 123456)');
  };

  const registerVictim = async ({ name, phone, district, firNumber, language }) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));

    const newVictim = {
      id: `V-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name || 'Survivor (Confidential)',
      role: ROLE_VICTIM,
      phone,
      district: district || 'Kalahandi',
      firNumber: firNumber || 'Self-Enrolled (Pre-FIR Support)',
      language: language || 'en',
      token: `mock-jwt-victim-${Date.now()}`,
      registeredAt: new Date().toISOString(),
    };

    const registered = JSON.parse(localStorage.getItem('sahayak_registered_victims') || '[]');
    registered.push(newVictim);
    localStorage.setItem('sahayak_registered_victims', JSON.stringify(registered));

    setUser(newVictim);
    setIsAuthenticated(true);
    localStorage.setItem('sahayak_user', JSON.stringify(newVictim));
    localStorage.setItem('sahayak_token', newVictim.token);
    setIsLoading(false);
    return { success: true, user: newVictim };
  };

  const loginAuthority = async (param1, password, roleParam, districtParam) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    let email = 'officer@odisha.gov.in';
    let role = ROLE_COUNSELOR;
    let district = 'Kalahandi';

    if (typeof param1 === 'object' && param1 !== null) {
      email = param1.emailId || param1.email || 'officer@odisha.gov.in';
      const rawRole = (param1.role || '').toLowerCase();
      role = rawRole.includes('counselor') ? ROLE_COUNSELOR : ROLE_OFFICER;
      district = param1.district || 'Kalahandi';
    } else {
      email = param1 || 'officer@odisha.gov.in';
      const rawRole = (roleParam || '').toLowerCase();
      role = rawRole.includes('counselor') ? ROLE_COUNSELOR : ROLE_OFFICER;
      district = districtParam || 'Kalahandi';
    }

    const mockAuthorityUser = {
      id: 'OFF-KLD-001',
      name: role === ROLE_COUNSELOR ? 'Dr. Ananya Mishra' : 'Officer Rajan Naik',
      role: role,
      email: typeof email === 'string' ? email : 'officer@odisha.gov.in',
      district: typeof district === 'string' ? district : 'Kalahandi',
      token: 'mock-jwt-authority',
    };

    setUser(mockAuthorityUser);
    setIsAuthenticated(true);
    localStorage.setItem('sahayak_user', JSON.stringify(mockAuthorityUser));
    localStorage.setItem('sahayak_token', mockAuthorityUser.token);
    setIsLoading(false);
    return { success: true, user: mockAuthorityUser };
  };

  const registerAuthority = async ({ name, email, role, district, employeeId }) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));

    const normalizedRole = (role || '').toLowerCase().includes('counselor')
      ? ROLE_COUNSELOR
      : ROLE_OFFICER;

    const newOfficer = {
      id: employeeId || `OFF-${Math.floor(100 + Math.random() * 900)}`,
      name: name || 'Designated Officer',
      role: normalizedRole,
      email,
      district: district || 'Kalahandi',
      token: `mock-jwt-authority-${Date.now()}`,
      isVerified: true,
    };

    setUser(newOfficer);
    setIsAuthenticated(true);
    localStorage.setItem('sahayak_user', JSON.stringify(newOfficer));
    localStorage.setItem('sahayak_token', newOfficer.token);
    setIsLoading(false);
    return { success: true, user: newOfficer };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('sahayak_user');
    localStorage.removeItem('sahayak_token');
  };

  const updateProfile = (updates) => {
    setUser((currentUser) => {
      if (!currentUser) return currentUser;
      const updatedUser = { ...currentUser, ...updates };
      localStorage.setItem('sahayak_user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        loginVictim,
        loginDemo,
        registerVictim,
        loginAuthority,
        registerAuthority,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
