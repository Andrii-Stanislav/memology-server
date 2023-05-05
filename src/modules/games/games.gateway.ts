import {
  WebSocketGateway,
  SubscribeMessage,
  // WsResponse,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { UsePipes } from '@nestjs/common';

import { SocketAuthPipe } from '../../guards/socket-auth.pipe';

@WebSocketGateway({ cors: true })
export class CamesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server;

  connectedUsers: string[] = [];

  constructor(private jwtService: JwtService) {}

  async handleConnection(socket) {
    try {
      // console.log('handleConnection. token: ', socket.handshake.query?.token);
      // console.log('token: ', socket.handshake.query?.token);
      // const user = await this.jwtService.verify(socket.handshake.query?.token);
      // console.log('user: ', user);
      // this.connectedUsers = [...this.connectedUsers, String(user._id)];
      // this.server.emit('users', this.connectedUsers);
    } catch (error) {
      //
    }
  }

  async handleDisconnect(socket) {
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

  @UsePipes(SocketAuthPipe)
  @SubscribeMessage('sendMessage')
  async onSendMessage(client, message: string) {
    // console.log('sendMessage: ', client, message);
    // client.broadcast.emit('sendMessage', message);
  }
  //
}
