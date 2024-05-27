import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UsersContext } from '../context/users';
import { NewUser, User } from '../types/User';
import UserForm from './userform';

function EditUser() {
  const { fetchUser, updateUser } = useContext(UsersContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  const location = useLocation();
  const locationState = location.state as { userId?: string };
  const userId = locationState.userId;
  if (!userId) return <></>;

  useEffect(() => {
    // once on loading a component - load user data
    const loadedUser = fetchUser(userId);
    if (loadedUser) setUser(loadedUser);
  }, []);

  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedUser: NewUser = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      dob: formData.get('dob') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
    };

    const err = await updateUser(userId as string, updatedUser);
    setErrorMessage(err);
    if (err.length === 0) navigate('/view');
  }

  return <UserForm user={user} formHandler={submitHandler} title="Edit User" errorMessage={errorMessage} />;
}

export default EditUser;
