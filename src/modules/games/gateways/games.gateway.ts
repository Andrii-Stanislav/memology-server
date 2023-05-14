import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { UsePipes } from '@nestjs/common';

import { SocketAuthPipe } from '../../../guards/socket-auth.pipe';

import { GamesService } from '../games.service';
import { WS_KEYS } from '../constants';

@WebSocketGateway({ cors: true })
export class CamesGateway {
  @WebSocketServer() server: Server;

  connectedUsers: string[] = [];

  constructor(
    private jwtService: JwtService,
    private readonly gameService: GamesService,
  ) {}

  @UsePipes(SocketAuthPipe)
  @SubscribeMessage(WS_KEYS.JOIN_GAME)
  async onSendMessage(client: Socket, message: string) {
    console.log('sendMessage: ', client, message);
    // client.broadcast.emit('sendMessage', message);
  }
  //
}
