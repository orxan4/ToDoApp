import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';
import { UnauthorizedException } from '@nestjs/common';
import { Socket } from 'socket.io';

import { UserService } from '../../user/services/user.service';
import { AuthService } from '../../auth/services/auth.service';
import { UserInterface } from '../../user/interfaces/user.interface';

@WebSocketGateway({ namespace: 'todos' })
export class TodoGateway implements OnGatewayConnection {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  async handleConnection(socket: Socket): Promise<any> {
    try {
      // if the token is not verified, this will throw and we can catch & disconnect the user
      const jwtToken: string | undefined = socket.handshake.headers.authorization;

      if (jwtToken) {
        const decodedToken = await this.authService.verifyJWT(jwtToken);

        // if the token is valid, we get the user by id from our database
        const user: UserInterface = await this.userService.getOneById(decodedToken.user.id);
        if (!user) {
          console.log('disconnect user');
          return this.disconnect(socket);
        } else {
          console.log('do smth', user);
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
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }
}
