import { Outlet, Link } from 'react-router-dom';
import { AuthContext } from '../context';
import { useContext } from 'react';
import { UsersContext } from '../context/users';
import { useTranslation } from 'react-i18next'
// import { useScopedTranslation } from './hooks/useScopedTranslation';

function Layout() {
  const { logoutUser } = useContext(AuthContext);
  const { selectedRow } = useContext(UsersContext);
  
  // const { t, i18n: {changeLanguage, language} } = useTranslation();

  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'navigation',
  });
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto px-4 py-2 flex items-center justify-between">
          <ul className="flex space-x-4">
            <li>
              <Link className="text-white px-3 py-2 rounded-md hover:bg-gray-600" to="/view">
              {t('view')}
              </Link>
            </li>
            <li>
              <Link className="text-white px-3 py-2 rounded-md hover:bg-gray-700" to="/create">
              {t('create')}
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
                {t('edit')}
              </Link>
            </li>
          </ul>
          <button className="text-gray-200" onClick={() => changeLanguage('en')}>English</button>
          <button className="text-gray-200" onClick={() => changeLanguage('he')}>עברית</button>
          <button className="text-gray-200" onClick={() => changeLanguage('ru')}>Русский</button>
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
