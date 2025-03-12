import { Controller, Post, Body } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserService } from '../services/user.service';
import { DtoHelperService } from '../dto/dto-helper.service';
import { LoginResponseInterface, UserDto, UserLoginModel } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDTO } from '../dto/login-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly dtoHelperService: DtoHelperService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const userEntity = this.dtoHelperService.createUserDtoToEntity(createUserDto);
    return this.userService.create(userEntity);
  }

  @Post('login')
  async login(@Body() loginUserDTO: LoginUserDTO): Promise<LoginResponseInterface> {
    const userEntity: UserLoginModel = this.dtoHelperService.loginUserDtoToEntity(loginUserDTO);
    const jwt: string = await this.userService.login(userEntity);
    return {
      access_token: jwt,
      token_type: 'JWT',
      expires_in: this.configService.getOrThrow<string>('JWT_EXPIRES_IN'),
    };
  }
}
