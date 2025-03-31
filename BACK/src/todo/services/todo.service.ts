import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../entities/todo.entity';
import { TodoItemInterface } from '../interfaces/todo.interface';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(TodoEntity) private readonly todoRepository: Repository<TodoEntity>) {}

  findAll(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }

  saveAll(todoItems: TodoItemInterface[]): Promise<TodoItemInterface[]> {
    return this.todoRepository.save(todoItems);
  }
}
