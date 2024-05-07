import { useEffect, useState } from 'react';
import './App.css';
import Home from '../pages/home';
import Login from '../pages/login';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

const GUEST = 'Guest';
const USER = {
  name: 'bob',
  password: '12345',
};

function App() {
  const [name, setName] = useState(GUEST);
  const [user, setUser] = useState({ name: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (user.name === USER.name && user.password === USER.password) {
      setName(user.name);
      navigate('/home');
    }
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nameEntered = formData.get('name');
    const passwordEntered = formData.get('password');
    setUser({ name: nameEntered, password: passwordEntered });
    e.target.reset;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/home" element={<Home user_name={name} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
