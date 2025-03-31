import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectionEntity } from '../entities/connection.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ConnectionInterface } from '../interfaces/user.interface';

@Injectable()
export class ConnectionService {
  constructor(@InjectRepository(ConnectionEntity) private readonly connectionRepo: Repository<ConnectionEntity>) {}

  async create(connection: ConnectionInterface): Promise<ConnectionInterface> {
    return this.connectionRepo.save(connection);
  }

  async findByUserId(userId: number): Promise<ConnectionEntity[]> {
    return this.connectionRepo.find({ where: { connectedUser: { id: userId } } });
  }

  async deleteBySocketId(socketId: string): Promise<DeleteResult> {
    return this.connectionRepo.delete({ socketId });
  }

  async deleteAll() {
    await this.connectionRepo.createQueryBuilder().delete().execute();
  }
}
