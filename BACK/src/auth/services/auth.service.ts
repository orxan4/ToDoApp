import { Injectable } from '@nestjs/common';
import { UserDto } from '../../user/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwt(user: UserDto): Promise<string> {
    return this.jwtService.signAsync({ user });
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 1);
  }

  async comparePassword(password: string, storedPasswordHash: string): Promise<boolean> {
    return await bcrypt.compare(password, storedPasswordHash);
  }

  async verifyJWT(jwt: string): Promise<any> {
    return this.jwtService.verifyAsync(jwt);
  }
}
