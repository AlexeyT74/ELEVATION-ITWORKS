import type { NewUser, User } from '../types/User';
// import { encryptStr } from '../utils/encryptStr';
import makeUUID from '../utils/makeUUID';
import parseDate from '../utils/parseDate';
// MOCK METHODS

import data from '../mocks/jsons/data.json';

const USERS: User[] = data;

// validate user data

export function validateUserData(user: NewUser): boolean {
  if (user.firstName.length === 0) throw new Error('First Name should not be empty');
  if (user.lastName.length === 0) throw new Error('Last Name should not be empty');
  if (user.dob.length === 0) throw new Error('Date Of Birth should not be empty');
  if (user.email.length === 0) throw new Error('Email should not be empty');

  // check valid email
  if (!user.email.includes('@')) throw new Error('Invalid email');

  // check valid dob
  const validDate = parseDate(user.dob);
  if (!validDate) throw new Error('Invalid Date Of Birth');

  return true;
}

// create a user
export const createUser = async (user: NewUser): Promise<{ id: string } | { error: string }> => {
  try {
    validateUserData(user);

    const newUser = user as User;
    newUser.id = makeUUID();
    USERS.push(newUser);
    return { id: newUser.id };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

// update a user
export const updateUserById = async (id: string, user: NewUser): Promise<boolean> => {
  const index = USERS.findIndex((u) => u.id === id);
  if (index === -1) {
    return false;
  }
  USERS[index] = { ...user, id };
  return true;
};

// get a user by email
export const getUserByEmail = async (email: string): Promise<User | undefined> => {
  return USERS.find((user) => user.email === email);
};

// get a user by id
export const getUserById = async (id: string): Promise<User | undefined> => {
  return USERS.find((user) => user.id === id);
};

// get users paginated
export const getUsers = async (page: number, limit: number): Promise<User[]> => {
  return USERS.slice((page - 1) * limit, page * limit);
};

// delete a user by id
export const deleteUserById = async (id: string): Promise<boolean> => {
  const index = USERS.findIndex((user) => user.id === id);
  if (index === -1) {
    return false;
  }
  USERS.splice(index, 1);
  return true;
};
