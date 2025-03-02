import { LoginUserDTO } from './login-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto extends LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;
}
