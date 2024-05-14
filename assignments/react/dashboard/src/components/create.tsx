import { useContext, useEffect, useState } from 'react';
import { NewUser } from '../types/User';
import { UsersContext } from '../context/users';
import { useNavigate } from 'react-router-dom';
import UserForm from './userform';

function CreateUser() {
  const [errorMessage, setErrorMessage] = useState('');
  const { addUser, setSelectedRow } = useContext(UsersContext);
  const navigate = useNavigate();

  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newUser: NewUser = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      dob: formData.get('dob') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
    };
    const err = await addUser(newUser);
    setErrorMessage(err);
    if (err.length === 0) navigate('/view');
  }

  // Prevents going to Edit right after Create
  useEffect(()=> setSelectedRow(undefined),[])

  return <UserForm formHandler={submitHandler} title="Create User" errorMessage={errorMessage}/>;
}

export default CreateUser;
