import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserReq } from '../../guards';
import { JwtAuthGuard } from '../../guards';

import { CreateGameDto, JoinGameDto } from './dto';
import { Game } from './games.model';

@ApiBearerAuth()
@ApiTags('Games route')
@UseGuards(JwtAuthGuard)
@Controller('games')
export class GamesController {
  constructor(private readonly gameService: GamesService) {}

  @ApiOperation({ summary: 'Get all games' })
  @ApiResponse({ status: 200, type: [Game] })
  @Get()
  // TODO - add filters
  async getAllGames() {
    return this.gameService.getAllGames();
  }

  @ApiOperation({ summary: 'Create game' })
  @ApiResponse({ status: 200, type: Game })
  @Post()
  createGame(@Body() gameDto: CreateGameDto, @UserReq() user) {
    return this.gameService.createGame(gameDto, user.id);
  }

  @ApiOperation({ summary: 'Create game' })
  @ApiResponse({ status: 200, type: Game })
  @Post('/join')
  joinToGame(@Body() joinGameDto: JoinGameDto, @UserReq() user) {
    return this.gameService.joinToGame(joinGameDto.joinCode, user.id);
  }
}
