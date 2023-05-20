import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { PLAYER_STATUS, GAME_STATUS } from '../../../types/game';
import { PlayersService } from '../../players/players.service';
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

  constructor(
    private readonly gameService: GamesService,
    private readonly playersService: PlayersService,
  ) {}

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
    client.broadcast.emit(
      `${GAME_WS_KEYS.READY_FOR_GAME}/${message.gameId}`,
      message,
    );

    const game = await this.gameService.getGameById(message.gameId);
    const players = await this.playersService.getGamePlayers(message.gameId);

    if (
      players.length === game.playersCount &&
      players.every((player) => player.status === PLAYER_STATUS.READY)
    ) {
      await this.gameService.updateGame(message.gameId, {
        status: GAME_STATUS.STARTED,
      });
      // TODO - create first deal

      client.broadcast.emit(`${GAME_WS_KEYS.GAME_STARTED}/${message.gameId}`);
    }
  }
}
