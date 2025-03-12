export interface UserInterface {
  id?: number;
  username?: string;
  email: string;
  password: string;
}

export interface UserCreateModel {
  username: string;
  email: string;
  password: string;
}

export interface UserLoginModel {
  email: string;
  password: string;
}

export interface UserDto {
  id: number;
  username: string;
  email: string;
}

export interface LoginResponseInterface {
  access_token: string;
  token_type: string;
  expires_in: string;
}
