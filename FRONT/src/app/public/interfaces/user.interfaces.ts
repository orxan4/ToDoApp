export interface UserModel {
  id: number;
  username: string;
  email: string;
}

export interface UserRegisterDto {
  username: string;
  email: string;
  password: string;
}

export interface UserLoginDto {
  email: string;
  password: string;
}

export interface UserInterface {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
}
