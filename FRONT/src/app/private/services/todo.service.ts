import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';

import {
  CreateTodoItemInterface,
  StatusInterface,
  TodoItemInterface,
} from '../interfaces/todo-item.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public todoItems$: BehaviorSubject<TodoItemInterface[]> = new BehaviorSubject<TodoItemInterface[] | []>([]);

  socket = io('http://localhost:3000/todos', {
    auth: {
      Authorization: localStorage.getItem('access_token'),
    },
  });

  public getTodos() {
    this.socket.on('todos', (todos: TodoItemInterface[]) => {
      this.todoItems$.next(todos);
    });
  }

  public saveTodo(todoItem: CreateTodoItemInterface) {
    this.socket.emit('addTodo', todoItem);
  }

  public getAddedTodo() {
    this.socket.on('addedTodo', (todo: CreateTodoItemInterface) => {
      this.todoItems$.next([...this.todoItems$.value, todo]);
    });
  }

  public updateTodo(updatedItem: TodoItemInterface, containerId: string) {
    updatedItem.status = this.convertListIdToStatus(containerId);
    this.socket.emit('updateTodo', updatedItem);
  }

  public getUpdatedTodo() {
    this.socket.on('updatedTodo', (todoItem: TodoItemInterface) => {
      const itemIndex = this.todoItems$.value.findIndex(
        (item: TodoItemInterface): boolean => item.id === todoItem.id,
      );

      let items: TodoItemInterface[] = this.todoItems$.value;
      items[itemIndex] = todoItem;
      this.todoItems$.next(items);
    });
  }

  private convertListIdToStatus(listId: string): StatusInterface {
    switch (listId) {
      case 'cdk-drop-list-0':
        return 'BACKLOG';
      case 'cdk-drop-list-1':
        return 'TODO';
      case 'cdk-drop-list-2':
        return 'DONE';
      default:
        return 'BACKLOG';
    }
  }
}
