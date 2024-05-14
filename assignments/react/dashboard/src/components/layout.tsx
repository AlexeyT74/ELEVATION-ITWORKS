import { Outlet, Link } from 'react-router-dom';
import { AuthContext } from '../context';
import { useContext } from 'react';
import { UsersContext } from '../context/users';

function Layout() {
  const { logoutUser } = useContext(AuthContext);
  const { selectedRow } = useContext(UsersContext);

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto px-4 py-2 flex items-center justify-between">
          <ul className="flex space-x-4">
            <li>
              <Link className="text-white px-3 py-2 rounded-md hover:bg-gray-600" to="/view">
                View Users
              </Link>
            </li>
            <li>
              <Link className="text-white px-3 py-2 rounded-md hover:bg-gray-700" to="/create">
                Create a user
              </Link>
            </li>
            <li>
              <Link
                className={`text-white px-3 py-2 rounded-md ${selectedRow ? 'hover:bg-gray-700' : 'disabled'}`}
                to="/edit"
                onClick={(e) => {
                  // Prevents edit of unselected row
                  if (!selectedRow) e.preventDefault();
                }}
                state={{ userId: selectedRow }}
              >
                Edit a user
              </Link>
            </li>
          </ul>
          <button
            className="hover:bg-red-500 border border-red-400 text-gray-200 px-2 py-1 rounded-md focus:outline-none"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;
