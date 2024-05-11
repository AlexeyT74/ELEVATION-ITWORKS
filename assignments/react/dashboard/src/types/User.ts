// a user type with firstname,last name, email and password and dob
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  role: string;
  email: string;
  // password: string;
};

// a new user type with firstname,last name, email and password and dob
export type NewUser = Omit<User, 'id'>;

// a Pick with usernmae and password
// export type UserLogin = Pick<User, 'email' | 'password'>;
