import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { UsersContext } from '../context/users';
import { useNavigate } from 'react-router-dom';

function ViewUsers() {
  const { users, removeUser, selectedRow, setSelectedRow } = useContext(UsersContext);
  const navigate = useNavigate();

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
      navigate('/edit', {
        state: {
          userId: userId,
        },
      });
    }
    return;
  }

  function trClickHanlder(e: React.MouseEvent<HTMLTableRowElement>){
    const id = e.currentTarget.getAttribute("id");
    setSelectedRow(id)
  }

  useEffect(()=>{
    setSelectedRow(null);
  },[])

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
            <tr key={user.id} id={user.id} onClick={trClickHanlder} 
            className={`${selectedRow === user.id ? "bg-gray-300" : 'hover:bg-gray-100'} border-b border-gray-300 cursor-pointer`}>
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
