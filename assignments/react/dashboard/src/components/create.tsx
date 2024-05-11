import { useState } from 'react';
import { createUser } from '../service/users';
import type { CreateUser } from '../types/User';
import LabelInput from './label_input';

function CreateUser() {
  const [user, setUser] = useState<CreateUser>({
    firstName: '',
    lastName: '',
    dob: '',
    role: '',
    email: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newUser = { ...user };
    createUser(newUser);
    setUser({
      firstName: '',
      lastName: '',
      dob: '',
      role: '',
      email: '',
    });
  };

  return (
    <form onSubmit={submitHandler} className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-2/3 max-w-md bg-white rounded-md shadow-md p-4">
        <h1 className="text-3xl font-bold">New user</h1>
        <div className="flex flex-col space-y-2">
          <label className="block mb-2">
            First Name:
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Last Name:
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Date of Birth:
            <input
              type="text"
              name="dob"
              value={user.dob}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Role:
            <input
              type="text"
              name="role"
              value={user.role}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <button
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            type="submit"
          >
            Create
          </button>
          {errorMessage ? <p className="text-sm font-medium text-red">{errorMessage}</p> : ''}
        </div>
      </div>
    </form>
  );
}

export default CreateUser;
