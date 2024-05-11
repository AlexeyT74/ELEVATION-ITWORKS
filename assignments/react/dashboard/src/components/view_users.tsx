import { deleteUserById, getUsers } from '../service/users';
import { useState, useEffect, MouseEventHandler, useId } from 'react';
import type { User } from '../types/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

function ViewUsers() {
  const [users, setUsers] = useState<User[]>([]);
  // const [selectedRow, setSelectedRow] = useState(null);

  function IconButton({
    icon,
    onClick,
    userId,
  }: {
    icon: IconProp;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    userId: string;
  }) {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers(1, 100);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  async function deleteHandler(e: React.MouseEvent<HTMLButtonElement>) {
    const userId = e.currentTarget.getAttribute('id');
    if (userId) {
      console.log('Delete a user with Id = ', userId);
      try {
        if (await deleteUserById(userId)){
          
        }
      } catch (error) {}
    }
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
            <th className="px-4 py-2">Year Of Birth</th>
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