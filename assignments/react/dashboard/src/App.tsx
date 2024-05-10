import './App.css';
import Login from './components/login';
import ViewUsers from './components/view_users';
import EdUser from './components/user';
import Layout from './components/layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './context';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<ViewUsers />} />
            <Route path="user" element={<EdUser />} />
            <Route path="users" element={<ViewUsers />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
