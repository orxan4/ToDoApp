import { UserDto, UserInterface } from '../user/interfaces/user.interface';

export interface RequestMode {
  user: UserInterface;
  headers: any;
}

export interface JWTInterface {
  user: UserDto;
  iat: number;
  exp: number;
}
