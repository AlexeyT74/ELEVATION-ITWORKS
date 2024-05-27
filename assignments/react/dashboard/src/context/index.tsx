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
const initialContextUser: ContextUser = {
  user: initialUserState,
  isAuthenticated: false,
  loginUser: (_) => {},
  logoutUser: () => {},
};

export const AuthContext = createContext<ContextUser>(initialContextUser);

export default function AuthProvider({ children }: { children: React.ReactElement[] }) {
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
      navigate('/view');
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
