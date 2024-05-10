/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminUser } from '../types/Admin';

type ContextUser = {
  user: AdminUser;
  isAuthenticated: boolean;
  loginUser: (user: AdminUser) => void;
  logoutUser: () => void;
};

const initialUserState: AdminUser = { username: 'Guest', id: '0' };
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(initialUserState);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/users');
    }
  }, [user]);

  const loginHandler = (user: AdminUser) => {
    setIsAuthenticated(true);
    setUser(user);
  };

  const logoutHandler = () => {
    setIsAuthenticated(false);
    setUser(initialUserState);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loginUser: loginHandler, logoutUser: logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
}
