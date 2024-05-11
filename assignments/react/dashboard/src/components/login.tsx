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
      <form onSubmit={submitHandler} className="flex items-center justify-center min-h-screen">
        <div className="w-1/2 max-w-md bg-white rounded-md shadow-md p-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex flex-col space-y-2">
            <LabelInput sName="name" sLabel="Username:" isPassword={false} />
            <LabelInput sName="password" sLabel="Password:" isPassword={true} />{' '}
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              type="submit"
            >
              Login
            </button>
            {errorMessage ? <p className="text-sm font-medium text-red-500">{errorMessage}</p> : ''}
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
