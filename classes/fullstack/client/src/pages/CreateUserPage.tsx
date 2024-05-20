import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputField from '../components/InputField';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { createUser } from '../store/slices/users';
// import { createUser } from '../service/users';
import { createUser as createUserService } from '../service/users';
import { CreateUser, User } from '../types/User';

const CreateUserPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!firstName) newErrors.firstName = t('createUser.error.firstName');
    if (!lastName) newErrors.lastName = t('createUser.error.lastName');
    if (!email) {
      newErrors.email = t('createUser.error.emailRequired');
    } else if (!email.includes('@')) {
      newErrors.email = t('createUser.error.emailInvalid');
    }
    if (!password) {
      newErrors.password = t('createUser.error.passwordRequired');
    } else if (password.length < 6) {
      newErrors.password = t('createUser.error.passwordLength');
    }
    if (!dob) newErrors.dob = t('createUser.error.dob');

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const user: CreateUser = { firstName, lastName, email, password, dob };
    const result = await createUserService(user);
    if ('id' in result) {
      const userWithId: User = { ...user, id: result.id };
      dispatch(createUser(userWithId));
      navigate('/view-users');
    } else console.log(result.error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-darkBackground">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-darkCard p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4 text-gray-900 dark:text-darkText">{t('createUser.title')}</h2>
        <InputField
          label={t('createUser.firstName')}
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={errors.firstName}
        />
        <InputField
          label={t('createUser.lastName')}
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={errors.lastName}
        />
        <InputField
          label={t('createUser.email')}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <InputField
          label={t('createUser.password')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <InputField
          label={t('createUser.dob')}
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          error={errors.dob}
        />
        {errors.general && <div className="text-red-500 mb-4">{errors.general}</div>}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          {t('createUser.createButton')}
        </button>
      </form>
    </div>
  );
};

export default CreateUserPage;
