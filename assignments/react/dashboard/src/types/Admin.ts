// type admin try to login
export type Admin = {
  username: string;
  password: string;
  id: string;
};

// type admin succeddfully logged in
export type AdminLogin = Omit<Admin, 'id'>;

// type Admin with username,password
export type AdminUser = Omit<Admin, 'password'>;
