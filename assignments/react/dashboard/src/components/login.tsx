// import { AdminLogin } from '../types/Admin';
import { login } from '../service/auth';
import { useState, useContext } from 'react';
import { AuthContext } from '../context';
import LabelInput from './label_input';

function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const { loginUser, logoutUser } = useContext(AuthContext);

  async function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('name') as string;
    const password = formData.get('password') as string;
    if (username.length === 0 || password.length === 0) {
      setErrorMessage("Username and password can't be empty");
      return;
    }
    try {
      const result = await login(username, password);
      if (result === null) {
        setErrorMessage('Username and password do not match');
        return;
      }
      loginUser(result);
    } catch (error) {
      console.error('??', error);
      setErrorMessage(error as string);
    }
  }

  return (
    <>
      <form onSubmit={submitHandler} className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-2/3 max-w-md bg-white rounded-md shadow-md p-4 ">
          <h1 className="text-3xl font-bold pb-3">Admin Dashboard</h1>
          <div className="flex flex-col space-y-2">
            <LabelInput sName="name" sLabel="Username:"/>
            <LabelInput sName="password" sLabel="Password:" bType="password" />{' '}
            <button
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              type="submit"
            >
              Login
            </button>
            {errorMessage ? <p className="text-sm font-medium text-red-700">{errorMessage}</p> : ''}
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
