import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './create-user.dto';
import { LoginUserDTO } from './login-user.dto';
import { UserLoginModel } from '../interfaces/user.interface';

@Injectable()
export class DtoHelperService {
  createUserDtoToEntity(createUserDto: CreateUserDto) {
    return {
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
    };
  }

  loginUserDtoToEntity(loginUserDto: LoginUserDTO): UserLoginModel {
    return {
      email: loginUserDto.email,
      password: loginUserDto.password,
    };
  }
}
