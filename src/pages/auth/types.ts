export interface User {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface Login extends Omit<User, "name" | "username">{
  remember:boolean;
  [key: string]:string | boolean
};

export type LoginClean = {  
  [P in keyof Omit<Login, 'remember'>]: string; 
};

export interface LoginResponse {
  accessToken: string;
}

export interface UserResponse extends Omit<User, "password"> {
  id: string;
  createdAt: string;
}


