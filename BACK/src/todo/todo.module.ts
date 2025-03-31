import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoGateway } from './gateway/todo.gateway';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

import { ConnectionService } from '../user/services/connection.service';
import { TodoService } from './services/todo.service';
import { SetupService } from './services/setup.service';

import { ConnectionEntity } from '../user/entities/connection.entity';
import { TodoEntity } from './entities/todo.entity';

@Module({
  imports: [UserModule, AuthModule, TypeOrmModule.forFeature([ConnectionEntity, TodoEntity])],
  providers: [TodoGateway, ConnectionService, TodoService, SetupService],
})
export class TodoModule {}
