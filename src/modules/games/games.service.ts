import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { shuffle } from 'lodash';
import { Op } from 'sequelize';

import { PLAYER_STATUS, GAME_STATUS } from '../../types/game';

import { MemesService } from '../memes/memes.service';
import { SituationsService } from '../situations/situations.service';
import { PlayersService } from '../players/players.service';
import { DealsService } from '../deals/deals.service';
import { Bet } from '../bets/bets.model';
import { Deal } from '../deals/deals.model';

import { Game } from './games.model';
import { CreateGameDto, UpdateGameDto, JoinGameDto } from './dto';

@Injectable()
export class GamesService {
  constructor(
    private readonly memeService: MemesService,
    private readonly situationsService: SituationsService,
    private readonly playersService: PlayersService,
    private readonly dealsService: DealsService,
    @InjectModel(Game) private gameRepository: typeof Game,
  ) {}

  async getAllGames() {
    return await this.gameRepository.findAll({
      include: [{ all: true }, { model: Deal, include: [Bet] }],
    });
  }

  async getAllCreatedGames(creatorId: number) {
    return await this.gameRepository
      .findAll({
        where: { creatorId },
        include: [{ all: true }, { model: Deal, include: [Bet] }],
      })
      .then(this.sortGamesByStatus);
  }

  async getAllParticipatedGames(userId: number) {
    return await this.gameRepository
      .findAll({
        where: {
          [Op.and]: [{ creatorId: { [Op.ne]: userId } }],
        },
        include: [{ all: true }, { model: Deal, include: [Bet] }],
      })
      .then((games) =>
        games.filter((game) =>
          game.players.some((player) => player.userId === userId),
        ),
      )
      .then(this.sortGamesByStatus);
  }

  async getGameById(gameId: number) {
    const game = await this.gameRepository.findOne({
      where: { id: gameId },
      include: [{ all: true }, { model: Deal, include: [Bet] }],
    });

    return game;
  }

  async removeGame(id: number) {
    return await this.gameRepository.destroy({ where: { id } });
  }

  async createGame(dto: CreateGameDto, creatorId: number) {
    const { title, playersCount, cardsOnHands, dealsCount } = dto;

    const [cards, situations] = await Promise.all([
      this.getGameInitCards(playersCount * dealsCount * cardsOnHands),
      this.getGameInitSituations(dealsCount),
    ]);

    return await this.gameRepository.create({
      title,
      playersCount,
      cards,
      situations,
      cardsOnHands,
      creatorId,
    });
  }

  async updateGame(gameId: number, dto: UpdateGameDto) {
    return await this.gameRepository.update(dto, { where: { id: gameId } });
  }

  async joinToGame(joinDto: JoinGameDto, userId: number) {
    const game = await this.gameRepository.findOne({
      where: { id: joinDto.gameId, joinCode: joinDto.joinCode },
      include: { all: true },
    });

    if (!game) {
      throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
    }

    if (game.playersCount === game.players.length) {
      throw new HttpException(
        'There is no space in this game',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { playerCards, newGameCards } = this.dealCardsToPlayer(game);

    const player = await this.playersService.createPlayer({
      name: joinDto.playerName,
      cards: playerCards,
      userId,
      gameId: game.id,
    });

    await this.gameRepository.update(
      { cards: newGameCards },
      { where: { id: joinDto.gameId } },
    );

    return player;
  }

  async startGame(game: Game) {
    const situationId = game.situations[0];
    const newGameSituations = game.situations.slice(1);

    const deal = await this.dealsService.createDeal({
      gameId: game.id,
      judgeId: game.creatorId,
      situationId,
    });

    await this.updateGame(game.id, {
      status: GAME_STATUS.STARTED,
      situations: newGameSituations,
      currentDealId: deal.id,
    });
  }

  async createNewDeal(gameId: number, judgeId: number) {
    const game = await this.getGameById(gameId);

    if (!game) {
      throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
    }

    if (game.situations.length === 0) {
      throw new HttpException(
        'Game dont have more situations',
        HttpStatus.NOT_FOUND,
      );
    }

    const situationId = game.situations[0];
    const newGameSituations = game.situations.slice(1);

    const [newGameCards, deal] = await Promise.all([
      this.dealNewCardsToPlayers(game),
      this.dealsService.createDeal({
        gameId,
        judgeId,
        situationId,
      }),
    ]);

    await this.updateGame(game.id, {
      situations: newGameSituations,
      currentDealId: deal.id,
      cards: newGameCards,
    });
  }

  // * helpers

  canStartGame(game: Game) {
    return (
      game.players.length === game.playersCount &&
      game.players.every((player) => player.status === PLAYER_STATUS.READY)
    );
  }

  // * private methods

  private async getGameInitSituations(count: number) {
    const allSituations = await this.situationsService.getAllSituations();

    return shuffle(allSituations.map(({ id }) => id)).slice(0, count);
  }

  private async getGameInitCards(count: number) {
    const allMemes = await this.memeService.getAllMemes();

    return shuffle(allMemes.map(({ id }) => id)).slice(0, count);
  }

  private async dealNewCardsToPlayers(game: Game) {
    const currentDeal = game.deals.find(({ id }) => id === game.currentDealId);

    await Promise.all([
      ...game.players
        .filter(({ userId }) => userId !== currentDeal?.judgeId)
        .map((player, index) => {
          const cards = [...player.cards, game.cards[index]];
          return this.playersService.updatePlayer(player.id, { cards });
        }),
    ]);

    const newGameCards = game.cards.slice(game.players.length);

    return newGameCards;
  }

  private dealCardsToPlayer(game: Game) {
    const playerCards = game.cards.slice(0, game.cardsOnHands);
    const newGameCards = game.cards.filter((id) => !playerCards.includes(id));

    return { playerCards, newGameCards };
  }

  private sortGamesByStatus(games: Game[]) {
    const SORTING_ORDER = {
      [GAME_STATUS.STARTED]: 0,
      [GAME_STATUS.NOT_STARTED]: 1,
      [GAME_STATUS.FINISHED]: 2,
    };

    return games.sort(
      (gameA, gameB) =>
        SORTING_ORDER[gameA.status] - SORTING_ORDER[gameB.status],
    );
  }
}
