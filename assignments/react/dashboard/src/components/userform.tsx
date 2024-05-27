import { ReactEventHandler } from 'react';
import { NewUser } from '../types/User';
import LabelInput from './label_input';

interface IUserFormProps {
  title: string;
  user?: NewUser;
  formHandler: ReactEventHandler;
  errorMessage: string;
}

// General User form for Edit and Create functionality
function UserForm({ title, user = undefined, formHandler, errorMessage }: IUserFormProps) {
  return (
    <form onSubmit={formHandler} className="flex items-center justify-center grow bg-gray-100">
      <div className="w-2/3 max-w-md bg-white rounded-md shadow-md p-4">
        <h1 className="text-3xl font-bold pb-3">{title}</h1>
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
            Confirm
          </button>
          {errorMessage ? <p className="text-sm font-medium text-red-700">{errorMessage}</p> : ''}
        </div>
      </div>
    </form>
  );
}

export default UserForm;
