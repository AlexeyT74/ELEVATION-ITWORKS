// import './App.css';
import Login from './components/login';
import ViewUsers from './components/view_users';
import EditUser from './components/edit';
import Layout from './components/layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './context';
import CreateUser from './components/create';
import UsersProvider from './context/users';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UsersProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<ViewUsers />} />
              <Route path="edit" element={<EditUser />} />
              <Route path="view" element={<ViewUsers />} />
              <Route path="create" element={<CreateUser />} />
            </Route>
          </Routes>
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
