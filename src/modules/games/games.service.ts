import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { shuffle } from 'lodash';

import { MemesService } from '../memes/memes.service';
import { PlayersService } from '../players/players.service';

import { Game } from './games.model';
import { CreateGameDto, JoinGameDto } from './dto';

@Injectable()
export class GamesService {
  constructor(
    private readonly memeService: MemesService,
    private readonly playersService: PlayersService,
    @InjectModel(Game) private gameRepository: typeof Game,
  ) {}

  async getAllGames() {
    return await this.gameRepository.findAll({ include: { all: true } });
  }

  async getGameById(gameId: number) {
    const game = await this.gameRepository.findOne({
      where: { id: gameId },
      include: { all: true },
    });

    return game;
  }

  async removeGame(id: number) {
    return await this.gameRepository.destroy({ where: { id } });
  }

  async createGame(dto: CreateGameDto, creatorId: number) {
    const { title, playersCount, cardsOnHands, totalCardsPerUser } = dto;

    const cards = await this.getGameInitCards(playersCount * totalCardsPerUser);

    return await this.gameRepository.create({
      title,
      playersCount,
      cards,
      cardsOnHands,
      creatorId,
    });
  }

  async joinToGame(joinDto: JoinGameDto, userId: number) {
    const game = await this.gameRepository.findOne({
      where: { id: joinDto.gameId, joinCode: joinDto.joinCode },
      include: { all: true },
    });

    if (!game) {
      throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
    }

    const { playerCards, newGameCards } = this.dealCardsToPlayer(game);

    const player = await this.playersService.createPlayer({
      name: joinDto.playerName,
      cards: playerCards.join(','),
      userId,
      gameId: game.id,
    });

    await this.gameRepository.update(
      { cards: newGameCards.join(',') },
      { where: { id: joinDto.gameId } },
    );

    return player;
  }

  private async getGameInitCards(count: number) {
    const allMemes = await this.memeService.getAllMemes();

    return shuffle(allMemes.map(({ id }) => id))
      .slice(count)
      .join(',');
  }

  private dealCardsToPlayer(game: Game) {
    const gameCards = game.cards.split(',').map((id) => Number(id.trim()));
    const playerCards = gameCards.slice(0, game.cardsOnHands);
    const newGameCards = gameCards.filter((id) => !playerCards.includes(id));

    return { playerCards, newGameCards };
  }
}
