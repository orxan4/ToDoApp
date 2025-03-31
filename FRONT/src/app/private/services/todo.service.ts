import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { TodoItemInterface } from '../interfaces/todo-item.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  socket = io('http://localhost:3000/todos', {
    auth: {
      Authorization: localStorage.getItem('access_token'),
    },
  });

  public sendMessage() {
    this.socket.emit('message', 'message')
  }

  public getTodos() {
    this.socket.on('todos', (todos: TodoItemInterface[]) => {
      todos.forEach(t => console.log(t));
    })
  }
}
