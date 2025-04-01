import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { TodoService } from './todo.service';
import { TodoItemInterface } from '../interfaces/todo.interface';

@Injectable()
export class SetupService implements OnApplicationBootstrap {
  constructor(private todoService: TodoService) {}

  async onApplicationBootstrap(): Promise<void> {
    const items: TodoItemInterface[] = [
      {
        title: 'Hard Item',
        complexity: 'HARD',
        subTitle: 'Hard Subtitle',
        text: 'Hard Text',
        status: 'BACKLOG',
      },
      {
        title: 'Medium Item',
        complexity: 'MEDIUM',
        subTitle: 'Medium Subtitle',
        text: 'Medium Text',
        status: 'TODO',
      },
      {
        title: 'Easy Item',
        complexity: 'EASY',
        subTitle: 'Easy Subtitle',
        text: 'Easy Text',
        status: 'DONE',
      },
      {
        title: 'Example Item',
        complexity: 'MEDIUM',
        subTitle: 'Example Subtitle',
        text: 'Example Text',
        status: 'DONE',
      },
    ];
    await this.todoService.saveAll(items);
  }
}
