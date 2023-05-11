import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { UsePipes } from '@nestjs/common';

import { SocketAuthPipe } from '../../../guards/socket-auth.pipe';

@WebSocketGateway({ cors: true })
export class CommonGateway implements OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  connectedUsers: string[] = [];

  constructor(private jwtService: JwtService) {}

  @UsePipes(SocketAuthPipe)
  async handleDisconnect(socket: Socket) {
    // console.log('handleDisconnect: ', socket);
    // const user = await this.jwtService.verify(socket.handshake.query.token);
    // const userPos = this.connectedUsers.indexOf(String(user._id));
    // if (userPos > -1) {
    //   this.connectedUsers = [
    //     ...this.connectedUsers.slice(0, userPos),
    //     ...this.connectedUsers.slice(userPos + 1),
    //   ];
    // }
    // // Sends the new list of connected users
    // this.server.emit('users', this.connectedUsers);
  }
}
