import { useState } from 'react';
import { createUser } from '../service/users';
import LabelInput from './label_input';

function CreateUser() {
  const [errorMessage, setErrorMessage] = useState('');

  async function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      dob: formData.get('dob') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
    };

    try {
      const result = await createUser(newUser);
      if ('id' in result) {
        setErrorMessage('');
      } else {
        //error
        setErrorMessage(result.error);
      }
    } catch (error) {
      console.log('??', error);
      setErrorMessage(error as string);
    }
  }

  return (
    <form onSubmit={submitHandler} className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-2/3 max-w-md bg-white rounded-md shadow-md p-4">
        <h1 className="text-3xl font-bold pb-3">New user</h1>
        <div className="flex flex-col space-y-2">
          <LabelInput sLabel="First Name:" sName="firstName" />
          <LabelInput sLabel="Last Name:" sName="lastName" />
          <LabelInput sLabel="Date Of Birth:" sName="dob" bType="date" />
          <LabelInput sLabel="Role:" sName="role" />
          <LabelInput sLabel="Email:" sName="email" bType="text" />
          <button
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            type="submit"
          >
            Create
          </button>
          {errorMessage ? <p className="text-sm font-medium text-red-700">{errorMessage}</p> : ''}
        </div>
      </div>
    </form>
  );
}

export default CreateUser;
