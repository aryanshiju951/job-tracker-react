import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('jat_user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('jat_user', JSON.stringify(user));
    else localStorage.removeItem('jat_user');
  }, [user]);

  const login = (email, password) => {
    // Very basic fake auth
    const role = email === 'hrmanager@gmail.com' ? 'manager' : 'user';
    setUser({ email, role });
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
