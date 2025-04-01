import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../entities/todo.entity';
import { CreateTodoItemInterface, TodoItemInterface } from '../interfaces/todo.interface';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(TodoEntity) private readonly todoRepository: Repository<TodoEntity>) {}

  findAll(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }

  save(todoItem: CreateTodoItemInterface): Promise<CreateTodoItemInterface> {
    return this.todoRepository.save(todoItem);
  }

  saveAll(todoItems: CreateTodoItemInterface[]): Promise<CreateTodoItemInterface[]> {
    return this.todoRepository.save(todoItems);
  }

  async update(todoItem: TodoItemInterface): Promise<CreateTodoItemInterface | null | undefined> {
    if (todoItem && todoItem.id) {
      await this.todoRepository.update(todoItem.id, todoItem);
      return this.todoRepository.findOne({
        where: { id: todoItem.id },
      });
    }
  }
}
