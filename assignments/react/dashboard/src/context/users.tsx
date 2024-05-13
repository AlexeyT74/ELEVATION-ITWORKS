import { createUser, deleteUserById, getUsers } from '../service/users';
import type { NewUser, User } from '../types/User';
import { createContext, useState, useEffect } from 'react';

type ContextUsers = {
  users: User[];
  removeUser: (userId: string) => void;
  addUser: (newUser: NewUser) => Promise<string>;
  updateUser: (id: string, newUser: User) => void;
};
const initialContextUser: ContextUsers = {
  users: [],
  removeUser: (_) => {},
  addUser: (_) => {
    return new Promise((resolve, _) => resolve(''));
  },
  updateUser: (_1, _2) => {},
};
export const UsersContext = createContext<ContextUsers>(initialContextUser);

export default function UsersProvider({ children }: { children: React.ReactElement[] }) {
  const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   console.log('Context ', users);
  // }, [users]);

  async function removeUser(userId: string) {
    try {
      if (await deleteUserById(userId)) {
        setUsers(users.filter((item) => item.id != userId));
        console.log('Delete User with Id=', userId);
      }
    } catch (error) {}
  }

  async function addUser(newUser: NewUser) {
    let res = '';
    try {
      const result = await createUser(newUser);
      if ('id' in result) {
        const newUserWithId: User = { ...newUser, id: result.id };
        setUsers([...users, newUserWithId]);
        console.log('Add User: ', newUserWithId);
      } else {
        //error
        res = result.error;
      }
    } catch (error) {
      console.log('??', error);
      res = error as string;
    }
    return res;
  }

  function updateUser(id: string, newUser: User) {}

  const fetchData = async () => {
    try {
      const data = await getUsers(1, 10);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    console.log('User data initialized from scratch');
    fetchData();
  }, []);

  return <UsersContext.Provider value={{ users, removeUser, addUser, updateUser }}>{children}</UsersContext.Provider>;
}
