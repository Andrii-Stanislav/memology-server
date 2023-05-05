import { Controller, Get, Post, Body } from '@nestjs/common';
import { GamesService } from './games.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { UserReq } from '../../guards';

import { CreateGameDto } from './dto';
import { Game } from './games.model';

@Controller('games')
export class GamesController {
  constructor(private readonly gameService: GamesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all games' })
  @ApiResponse({ status: 200, type: [Game] })
  async getAllGames() {
    this.gameService.getAllGames();
  }

  @ApiOperation({ summary: 'Create game' })
  @ApiResponse({ status: 200, type: Game })
  @Post()
  createGame(@Body() gameDto: CreateGameDto, @UserReq() user) {
    return this.gameService.createGame(gameDto, user.id);
  }
}
