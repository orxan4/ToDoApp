import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserDto } from '../../user/interfaces/user.interface';
import { JWTInterface } from '../../interfaces/app.interface';

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

  async verifyJWT(jwt: string): Promise<JWTInterface> {
    return this.jwtService.verifyAsync(jwt);
  }
}
