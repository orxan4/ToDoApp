import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { AuthService } from '../../auth/services/auth.service';
import { UserDto, UserInterface, UserModel } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async create(newUser: UserModel): Promise<UserDto> {
    const emailExists: boolean = await this.mailExists(newUser.email);
    const usernameExists: boolean = await this.usernameExists(newUser.username);

    if (!emailExists && !usernameExists) {
      const passwordHash: string = await this.authService.hashPassword(newUser.password);

      const user = this.userRepository.create({
        username: newUser.username.toLowerCase(),
        email: newUser.email.toLowerCase(),
        password: passwordHash,
      });

      const _user: User = await this.userRepository.save(user, { reload: true });
      return {
        id: _user.id,
        username: _user.username,
        email: _user.email,
      } as UserDto;
    } else throw new HttpException('Email or Username already taken', HttpStatus.CONFLICT);
  }

  async login(user: UserInterface): Promise<string> {
    const foundUser: User | null = await this.findByEmail(user.email);

    if (foundUser) {
      const passwordsMatching: boolean = await this.authService.comparePassword(user.password, foundUser.password);

      if (passwordsMatching) {
        const passExcluded: UserDto = {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
        };
        return this.authService.generateJwt(passExcluded);
      } else throw new HttpException('Login was not successfully, wrong credentials', HttpStatus.UNAUTHORIZED);
    } else throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  private async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email }, select: ['id', 'email', 'password', 'username'] });
  }

  // private async findOne(id: number): Promise<UserModel | null> {
  //   return this.userRepository.findOne({ where: { id } });
  // }

  private async mailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user;
  }

  private async usernameExists(username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { username } });
    return !!user;
  }
}
