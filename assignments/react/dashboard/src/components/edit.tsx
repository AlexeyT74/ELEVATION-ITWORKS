import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UsersContext } from '../context/users';
import { NewUser, User } from '../types/User';
// import UserForm from './userform';
import LabelInput from './label_input';

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

    console.log('Edit loadedUser: ', loadedUser);
  }, []);

  useEffect(() => {
    console.log('Edit user: ', user);
  }, [user]);

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

    const err = await updateUser(userId as string, updatedUser)
    setErrorMessage(err);
    if (err.length===0)
      navigate("/view")
  }

  // return <UserForm user={user} formHandler={submitHandler} />;

  return (
    <form onSubmit={submitHandler} className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-2/3 max-w-md bg-white rounded-md shadow-md p-4">
        <h1 className="text-3xl font-bold pb-3">Edit User</h1>
        <div className="flex flex-col space-y-2">
          <LabelInput sLabel="First Name:" sName="firstName" sValue={user?.firstName} />
          <LabelInput sLabel="Last Name:" sName="lastName" sValue={user?.lastName} />
          <LabelInput sLabel="Date Of Birth:" sName="dob" bType="date" sValue={user?.dob} />
          <LabelInput sLabel="Role:" sName="role" sValue={user?.role} />
          <LabelInput sLabel="Email:" sName="email" bType="text" sValue={user?.email} />
          <button
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            type="submit"
          >
            Save
          </button>
          {errorMessage ? <p className="text-sm font-medium text-red-700">{errorMessage}</p> : ''}
        </div>
      </div>
    </form>
  );
}

export default EditUser;
