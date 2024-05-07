import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ handleSubmit }) {
  const USER_LEGAL = {
    name: 'bob',
    password: '12345',
  };

  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log(authError);
  }, [authError]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nameEntered = formData.get('name');
    const passwordEntered = formData.get('password');
    if (nameEntered === USER_LEGAL.name && passwordEntered === USER_LEGAL.password) {
      navigate('/home', { state: { userName: nameEntered } });
    } else setAuthError('Name and password pair is wrong');
    e.target.reset;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className="login">
        <div>
          <span>Name: </span>
          <input type="name" name="name"></input>
        </div>
        <div>
          <span>Password:</span>
          <input type="password" name="password"></input>
        </div>
        <button type="submit">Submit</button>
        {authError?.length ? <p>{authError}</p> : null}
      </div>
    </form>
  );
}

export default Login;
