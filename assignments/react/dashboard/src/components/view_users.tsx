import { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { UsersContext } from '../context/users';

function ViewUsers() {
  // const [selectedRow, setSelectedRow] = useState(-1);
  const { users, removeUser } = useContext(UsersContext);

  // useEffect(() => {
  //   console.log('ViewUsers ', users);
  // }, [users]);

  type IconButtonProp = {
    icon: IconProp;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    userId: string;
  };

  function IconButton({ icon, onClick, userId }: IconButtonProp) {
    return (
      <button
        onClick={onClick}
        id={userId}
        className="bg-transparent hover:bg-gray-200 py-2 px-2 rounded-full focus:outline-none"
      >
        <FontAwesomeIcon icon={icon} />
      </button>
    );
  }

  async function deleteHandler(e: React.MouseEvent<HTMLButtonElement>) {
    const userId = e.currentTarget.getAttribute('id');
    if (userId) removeUser(userId);
    return;
  }

  function editHandler(e: React.MouseEvent<HTMLButtonElement>) {
    const userId = e.currentTarget.getAttribute('id');
    if (userId) {
      console.log('Edit a user with Id = ', userId);
    }
    return;
  }

  // onMouseOver={handleInputMouseOver}
  // onMouseOut={handleInputMouseOut}

  return (
    <>
      <table className="table-auto w-11/12 mx-auto  mt-3">
        <thead className="bg-white border-b-gray-200">
          <tr className="text-gray-800 text-left border-b border-black">
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Date Of Birth</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} id={user.id} className="border-b border-gray-300 cursor-pointer hover:bg-gray-100">
              <td className="px-4 py-2">{user.firstName}</td>
              <td className="px-4 py-2">{user.lastName}</td>
              <td className="px-4 py-2">{user.dob}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td>
                <IconButton icon={faPenToSquare} onClick={editHandler} userId={user.id} />
                <IconButton icon={faTrashCan} onClick={deleteHandler} userId={user.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ViewUsers;
