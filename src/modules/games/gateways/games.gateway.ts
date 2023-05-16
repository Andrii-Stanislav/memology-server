import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { GamesService } from '../games.service';
import { GAME_WS_KEYS } from '../constants';

interface BaseMessage {
  gameId: number;
  [key: string]: any;
}

@WebSocketGateway({ namespace: 'game', cors: true })
export class CamesGateway {
  @WebSocketServer() server: Server;

  connectedUsers: string[] = [];

  constructor(private readonly gameService: GamesService) {}

  @SubscribeMessage(GAME_WS_KEYS.JOIN_GAME)
  async onJoinGame(client: Socket, message: BaseMessage) {
    // TODO - set as joined to game
    client.broadcast.emit(
      `${GAME_WS_KEYS.JOIN_GAME}/${message.gameId}`,
      message,
    );
  }

  @SubscribeMessage(GAME_WS_KEYS.LEAVE_GAME)
  async onLeaveGame(client: Socket, message: BaseMessage) {
    // TODO - set as unjoined to game
    client.broadcast.emit(
      `${GAME_WS_KEYS.LEAVE_GAME}/${message.gameId}`,
      message,
    );
  }

  // ! TEST WS
  @SubscribeMessage(GAME_WS_KEYS.TEST_MESSAGE)
  async test(client: Socket, message: BaseMessage) {
    client.broadcast.emit(
      `${GAME_WS_KEYS.TEST_MESSAGE}/${message.gameId}`,
      message,
    );
  }
}
