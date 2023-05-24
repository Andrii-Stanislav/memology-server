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
    client.broadcast.emit(
      `${GAME_WS_KEYS.JOIN_GAME}/${message.gameId}`,
      message,
    );
  }

  @SubscribeMessage(GAME_WS_KEYS.LEAVE_GAME)
  async onLeaveGame(client: Socket, message: BaseMessage) {
    client.broadcast.emit(
      `${GAME_WS_KEYS.LEAVE_GAME}/${message.gameId}`,
      message,
    );
  }

  @SubscribeMessage(GAME_WS_KEYS.READY_FOR_GAME)
  async onReadyForGame(client: Socket, message: BaseMessage) {
    const { gameId } = message;
    client.broadcast.emit(`${GAME_WS_KEYS.READY_FOR_GAME}/${gameId}`, message);

    const game = await this.gameService.getGameById(gameId);

    if (this.gameService.canStartGame(game)) {
      await this.gameService.startGame(game);
      client.broadcast.emit(`${GAME_WS_KEYS.GAME_STARTED}/${message.gameId}`);
    }
  }

  @SubscribeMessage(GAME_WS_KEYS.DEAL_STARTED)
  async onDealStarted(client: Socket, message: BaseMessage) {
    client.broadcast.emit(
      `${GAME_WS_KEYS.DEAL_STARTED}/${message.gameId}`,
      message,
    );
  }

  // TODO -  end game logic. When situations will finish
  // * after setting vinnerId in final deal
}
