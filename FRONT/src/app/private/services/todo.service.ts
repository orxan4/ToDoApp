import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

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
}
