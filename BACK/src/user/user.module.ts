import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers/user.controller';
import { AuthModule } from '../auth/auth.module';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { DtoHelperService } from './dto/dto-helper.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, DtoHelperService],
})
export class UserModule {}
