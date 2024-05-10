import { Outlet, Link } from 'react-router-dom';
import { AuthContext } from '../context';
import { useContext } from 'react';

function Layout() {
  const { logoutUser } = useContext(AuthContext);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/users">View Users</Link>
          </li>
          <li>
            <Link to="/create">Create User</Link>
          </li>
          <li>
            <Link to="/user">Edit User</Link>
          </li>
          <li>
            <button onClick={logoutUser}>Logout</button>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}

export default Layout;
