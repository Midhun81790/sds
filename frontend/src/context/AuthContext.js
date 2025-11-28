import { createContext, useContext, useState, useMemo } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('sds_token'));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('sds_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = ({ token: newToken, user: userProfile }) => {
    setToken(newToken);
    setUser(userProfile);
    localStorage.setItem('sds_token', newToken);
    localStorage.setItem('sds_user', JSON.stringify(userProfile));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('sds_token');
    localStorage.removeItem('sds_user');
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
