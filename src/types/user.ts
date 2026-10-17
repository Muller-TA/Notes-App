export interface User {
  id: string;
  username: string;
  email: string;
}

export interface StoredUser extends User {
  password: string;
}
