import { login } from '../service/auth';
import { useState, useContext } from 'react';
import { AuthContext } from '../context';
import LabelInput from './label_input';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './language_selector';

function Login() {
  const [errorMessage, setErrorMessage] = useState("err_empty");
  const { loginUser } = useContext(AuthContext);

  const { t, i18n } = useTranslation('login');

  document.body.dir = i18n.dir();

  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('name') as string;
    const password = formData.get('password') as string;
    if (username.trim().length === 0 || password.trim().length === 0) {
      setErrorMessage('err_not_empty');
      return;
    }
    try {
      const result = await login(username, password);
      if (result === null) {
        setErrorMessage('err_not_match');
        return;
      }
      loginUser(result);
    } catch (error) {
      setErrorMessage(error as string);
    }
  }

  return (
    <>
      <form onSubmit={submitHandler} className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-2/3 max-w-md bg-white rounded-md shadow-md p-4 ">
          <h1 className="text-3xl font-bold pb-3"> {t('title')}</h1>
          <div className="flex flex-col space-y-2">
            <LabelInput sName="name" sLabel= {t('username')} />
            <LabelInput sName="password" sLabel= {t('password')} bType="password" />{' '}
            <button
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              type="submit"
            >
               {t('submit')}
            </button>
            {errorMessage ? <p className="text-sm font-medium text-red-700">{t(errorMessage)}</p> : ''}
          </div>
        </div>
      </form>
      <LanguageSelector />
    </>
  );
}

export default Login;
