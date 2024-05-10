// import { AdminLogin } from '../types/Admin';
import { login } from '../service/auth';
import { useState, useContext } from 'react';
import { AuthContext } from '../context';

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
    <form onSubmit={submitHandler}>
      <h1>Admin Dashboard</h1>
      <div>
        <span>Username</span>
        <input type="text" name="name"></input>
      </div>
      <div>
        <span>Password</span>
        <input type="password" name="password"></input>
      </div>
      <button type="submit">Login</button>
      {errorMessage ? <p>{errorMessage}</p> : ''}
    </form>
  );
}

export default Login;
