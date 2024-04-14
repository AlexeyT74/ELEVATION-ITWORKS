import { getUsers, insertUser, getUserByEmail, deleteUserByEmail, updateUserByEmail } from './service/user.service.js';

getUsers()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });

async function init() {
  await createUsers();
  await updateUsers();
  await deleteUsers();
}


const users = [
  { email: 'one@gmail.com', name: { first: 'John', last: 'Dow' }, company: 'Google' },
  { email: 'two@gmail.com', name: { first: 'John2', last: 'Dow2' }, company: 'Microsoft' },
  { email: 'three@intel.com', name: { first: 'Mary', last: 'Jhones' }, company: 'Intel' },
];

init();

async function createUsers() {
  let res = await insertUser(users[0]);
  console.log('Adding a user: ', res.insertedId);

  res = await insertUser(users[1]);
  console.log('Adding a user: ', res.insertedId);

  res = await insertUser(users[2]);
  console.log('Adding a user: ', res.insertedId);
}

async function updateUsers() {
  let res = await updateUserByEmail(users[0].email, { name: 'Sara', company: 'Netflix' });
  res = console.log('Update a user: ', res);
}

async function deleteUsers() {
  let res = await deleteUserByEmail(users[2].email);
  console.log('Delete a user: ', res);
}
