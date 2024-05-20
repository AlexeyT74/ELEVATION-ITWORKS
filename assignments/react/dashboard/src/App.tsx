// import './App.css';
import Login from './components/login';
import ViewUsers from './components/view_users';
import EditUser from './components/edit';
import Layout from './components/layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './context';
import CreateUser from './components/create';
import UsersProvider from './context/users';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import i18next from 'i18next';

i18next
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });
;

function EmptyComponent(){
  return <div></div>
}

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
          <EmptyComponent />
        </UsersProvider>
        <EmptyComponent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;