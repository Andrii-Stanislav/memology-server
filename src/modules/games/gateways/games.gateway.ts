import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { PLAYER_STATUS, GAME_STATUS } from '../../../types/game';

import { PlayersService } from '../../players/players.service';
import { DealsService } from '../../deals/deals.service';
import { BetsService } from '../../bets/bets.service';

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
    private readonly dealsService: DealsService,
    private readonly betsService: BetsService,
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
    const { gameId } = message;
    client.broadcast.emit(`${GAME_WS_KEYS.READY_FOR_GAME}/${gameId}`, message);

    const game = await this.gameService.getGameById(gameId);

    // TODO - move create new Deal logic to games.service
    const situationId = game.situations[0];
    const newGameSituations = game.situations.slice(1);

    if (
      game.players.length === game.playersCount &&
      game.players.every((player) => player.status === PLAYER_STATUS.READY)
    ) {
      await Promise.all([
        this.dealsService.createDeal({
          gameId,
          judgeId: game.creatorId,
          situationId,
        }),
        this.gameService.updateGame(gameId, {
          status: GAME_STATUS.STARTED,
          situations: newGameSituations,
        }),
      ]);

      client.broadcast.emit(`${GAME_WS_KEYS.GAME_STARTED}/${message.gameId}`);
    }
  }
}
