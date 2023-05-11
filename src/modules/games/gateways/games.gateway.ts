import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { UsePipes } from '@nestjs/common';

import { SocketAuthPipe } from '../../../guards/socket-auth.pipe';

@WebSocketGateway({ cors: true })
export class CamesGateway {
  @WebSocketServer() server: Server;

  connectedUsers: string[] = [];

  constructor(private jwtService: JwtService) {}

  @UsePipes(SocketAuthPipe)
  @SubscribeMessage('sendMessage')
  async onSendMessage(client: Socket, message: string) {
    // console.log('sendMessage: ', client, message);
    // client.broadcast.emit('sendMessage', message);
  }
  //
}
