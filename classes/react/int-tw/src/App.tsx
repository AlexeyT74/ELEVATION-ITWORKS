import './App.css';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
// import { useScopedTranslation } from './hooks/useScopedTranslation';

// const locales = {
//   en: {
//     welcome: 'Hello World!',
//   },
//   he: {
//     welcome: 'שלום עולם!',
//   },
// };

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

function App() {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'App',
  });

  // const { t: scopedt } = useScopedTranslation({ defaultLanguage: i18n.language, locales });

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="App">
      <h1>{t('hello')}</h1>
      {/* <h1>{scopedt('welcome')}</h1> */}
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('he')}>עברית</button>
    </div>
  );
}

export default App;
