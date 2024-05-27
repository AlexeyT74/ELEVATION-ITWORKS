import { createUser, deleteUserById, getUsers, updateUserById, validateUserData } from '../service/users';
import type { NewUser, SortOrder, User, UserKey } from '../types/User';
import { createContext, useState, useEffect } from 'react';

type ContextUsers = {
  users: User[];
  removeUser: (userId: string) => void;
  addUser: (newUser: NewUser) => Promise<string>;
  updateUser: (id: string, updatedUser: NewUser) => Promise<string>;
  fetchUser: (id: string) => User | undefined;
  selectedRow: string | undefined | null;
  setSelectedRow: React.Dispatch<React.SetStateAction<string | undefined>>; // (_: string | undefined | null) => void;
  sortData: (columnId: UserKey, sortOrder: SortOrder) => void;
};

const initialContextUser: ContextUsers = {
  users: [],
  removeUser: (_) => {},
  addUser: async (_) => '',
  updateUser: async (_1, _2) => '',
  fetchUser: (_) => undefined,
  selectedRow: null,
  setSelectedRow: () => {},
  sortData: (_1, _2) => {},
};
export const UsersContext = createContext<ContextUsers>(initialContextUser);

export default function UsersProvider({ children }: { children: React.ReactElement[] }) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRow, setSelectedRow] = useState<string>();

  async function removeUser(userId: string) {
    try {
      if (await deleteUserById(userId)) {
        setUsers(users.filter((item) => item.id != userId));
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
      } else {
        //error
        res = result.error;
      }
    } catch (error) {
      res = error as string;
    }
    return res;
  }

  function fetchUser(id: string): User | undefined {
    return users.find((user) => user.id === id);
  }

  async function updateUser(id: string, user: NewUser) {
    try {
      validateUserData(user);
      const result = await updateUserById(id, user);
      if (result) {
        const updatedUser: User = { ...user, id };
        const updatedUsers = users.map<User>((u) => (u.id === id ? updatedUser : u));
        setUsers(updatedUsers);
      }
    } catch (error) {
      return (error as Error).message;
    }
    return '';
  }

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers(1, 10);
        setUsers(data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  function sortData(columnId: UserKey, sortOrder: SortOrder) {
    const newUsers = [...users];
    newUsers.sort((a, b) => {
      if (a[columnId] < b[columnId]) return sortOrder === 'asc' ? -1 : 1;
      if (a[columnId] > b[columnId]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setUsers(newUsers);
  }

  return (
    <UsersContext.Provider value={{ users, removeUser, addUser, updateUser, fetchUser, selectedRow, setSelectedRow, sortData }}>
      {children}
    </UsersContext.Provider>
  );
}
