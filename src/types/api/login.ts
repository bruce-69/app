import { User } from "./user";
  
export interface Login {
  nickname: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}