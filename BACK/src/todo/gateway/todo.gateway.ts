import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { UnauthorizedException } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { UserService } from '../../user/services/user.service';
import { AuthService } from '../../auth/services/auth.service';
import { UserInterface } from '../../user/interfaces/user.interface';
import { ConnectionService } from '../../user/services/connection.service';
import { TodoService } from '../services/todo.service';
import { TodoEntity } from '../entities/todo.entity';

@WebSocketGateway({ namespace: 'todos', cors: { origin: ['http://localhost:3000', 'http://localhost:4200'] } })
export class TodoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private connectionService: ConnectionService,
    private todoService: TodoService,
  ) {}

  async handleConnection(socket: Socket) {
    try {
      // if the token is not verified, this will throw and we can catch & disconnect the user
      const jwtToken: string | undefined = socket.handshake.auth.Authorization;

      if (jwtToken) {
        const decodedToken = await this.authService.verifyJWT(jwtToken);

        // if the token is valid, we get the user by id from our database
        const user: UserInterface = await this.userService.getOneById(decodedToken.user.id);
        if (!user) {
          console.log('disconnect user');
          return this.disconnect(socket);
        } else {
          console.log('do smth', user);

          // save the connection of the user in our database
          await this.connectionService.create({ socketId: socket.id, connectedUser: user });

          // get all todos from our database
          const todos: TodoEntity[] = await this.todoService.findAll();

          // only emit todos to the specific connected client
          return this.server.to(socket.id).emit('todos', todos);
        }
      } else {
        console.log('disconnect user');
        return this.disconnect(socket);
      }
    } catch {
      console.log('disconnect user');
      return this.disconnect(socket);
    }
  }

  private disconnect(socket: Socket) {
    // remove the connection from our database
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }

  async handleDisconnect(socket: Socket) {
    await this.connectionService.deleteBySocketId(socket.id);
    socket.disconnect();
  }
}
