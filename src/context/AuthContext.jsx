import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Supported country codes with their info
export const COUNTRY_CODES = [
  { code: '+1', country: 'US/Canada', length: 11 },
  { code: '+44', country: 'UK', length: 13 },
  { code: '+91', country: 'India', length: 13 },
  { code: '+86', country: 'China', length: 13 },
  { code: '+81', country: 'Japan', length: 13 },
  { code: '+49', country: 'Germany', length: 13 },
  { code: '+33', country: 'France', length: 12 },
  { code: '+39', country: 'Italy', length: 13 },
  { code: '+34', country: 'Spain', length: 12 },
  { code: '+7', country: 'Russia', length: 12 },
  { code: '+61', country: 'Australia', length: 12 },
  { code: '+55', country: 'Brazil', length: 13 },
  { code: '+52', country: 'Mexico', length: 13 },
  { code: '+27', country: 'South Africa', length: 12 },
  { code: '+20', country: 'Egypt', length: 12 },
  { code: '+971', country: 'UAE', length: 12 },
  { code: '+966', country: 'Saudi Arabia', length: 12 },
  { code: '+254', country: 'Kenya', length: 13 }, // Original Kenya code
  { code: '+234', country: 'Nigeria', length: 14 },
  { code: '+63', country: 'Philippines', length: 12 },
];

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing auth state
    const authState = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('currentUser');
    
    if (authState === 'true' && userData) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  // Get registered users from localStorage
  const getRegisteredUsers = () => {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
  };

  // Save user to localStorage
  const saveUser = (user) => {
    const existingUsers = getRegisteredUsers();
    const updatedUsers = [...existingUsers, user];
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
  };

  // Enhanced phone validation for multiple countries
  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) {
      return { valid: false, error: 'Phone number is required' };
    }

    // Check if it starts with a + sign
    if (!phoneNumber.startsWith('+')) {
      return { valid: false, error: 'Phone number must start with country code (+)' };
    }

    // Find matching country code
    const matchingCountry = COUNTRY_CODES.find(country => 
      phoneNumber.startsWith(country.code)
    );

    if (!matchingCountry) {
      const supportedCodes = COUNTRY_CODES.map(c => c.code).join(', ');
      return { 
        valid: false, 
        error: `Unsupported country code. Supported codes: ${supportedCodes}` 
      };
    }

    // Check length for the specific country
    if (phoneNumber.length !== matchingCountry.length) {
      return { 
        valid: false, 
        error: `Phone number for ${matchingCountry.country} must be ${matchingCountry.length} characters long` 
      };
    }

    // Check if it contains only numbers after the country code
    const numberPart = phoneNumber.slice(matchingCountry.code.length);
    if (!/^\d+$/.test(numberPart)) {
      return { 
        valid: false, 
        error: 'Phone number must contain only digits after country code' 
      };
    }

    return { valid: true, country: matchingCountry };
  };

  // Register new user with enhanced validation
  const register = (userData) => {
    const { phoneNumber, name, email } = userData;
    
    // Basic validation
    if (!phoneNumber || !name || !email) {
      return { success: false, error: 'All fields are required' };
    }

    // Enhanced phone validation
    const phoneValidation = validatePhoneNumber(phoneNumber);
    if (!phoneValidation.valid) {
      return { success: false, error: phoneValidation.error };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Please enter a valid email address' };
    }

    // Check if user already exists
    const existingUsers = getRegisteredUsers();
    const userExists = existingUsers.some(user => user.phoneNumber === phoneNumber);
    
    if (userExists) {
      return { success: false, error: 'Phone number already registered' };
    }

    // Create new user with country info
    const newUser = {
      id: Date.now(),
      phoneNumber,
      name,
      email,
      country: phoneValidation.country.country,
      countryCode: phoneValidation.country.code,
      registeredAt: new Date().toISOString()
    };

    // Save user
    saveUser(newUser);
    
    return { 
      success: true, 
      message: `Registration successful! You can now login with your ${phoneValidation.country.country} phone number.` 
    };
  };

  // Enhanced login function with multi-country support
  const login = (phoneNumber) => {
    if (!phoneNumber) {
      return { success: false, error: 'Phone number is required' };
    }

    // Enhanced phone validation
    const phoneValidation = validatePhoneNumber(phoneNumber);
    if (!phoneValidation.valid) {
      return { success: false, error: phoneValidation.error };
    }

    // Check against registered users
    const registeredUsers = getRegisteredUsers();
    const user = registeredUsers.find(user => user.phoneNumber === phoneNumber);
    
    // Demo accounts for different countries (for testing)
    const demoAccounts = [
      { phone: '+254712345678', name: 'Demo User Kenya', country: 'Kenya' },
      { phone: '+1234567890', name: 'Demo User USA', country: 'USA' },
      { phone: '+4412345678901', name: 'Demo User UK', country: 'UK' },
      { phone: '+911234567890', name: 'Demo User India', country: 'India' },
    ];

    const demoAccount = demoAccounts.find(demo => demo.phone === phoneNumber);

    if (user || demoAccount) {
      const currentUserData = user || {
        id: 'demo',
        phoneNumber: demoAccount.phone,
        name: demoAccount.name,
        email: 'demo@example.com',
        country: demoAccount.country,
        countryCode: phoneValidation.country.code
      };

      setIsAuthenticated(true);
      setCurrentUser(currentUserData);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(currentUserData));
      
      return { success: true };
    }

    return { 
      success: false, 
      error: `Phone number not registered. Please register first or use a demo account.` 
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  };

  const getAllUsers = () => {
    return getRegisteredUsers();
  };

  const value = {
    isAuthenticated,
    currentUser,
    login,
    logout,
    register,
    getAllUsers,
    validatePhoneNumber,
    COUNTRY_CODES,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
