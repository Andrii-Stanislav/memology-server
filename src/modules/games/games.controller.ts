import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserReq } from '../../guards';
import { JwtAuthGuard } from '../../guards';

import { CreateGameDto, JoinGameDto } from './dto';

@ApiBearerAuth()
@ApiTags('Games route')
@UseGuards(JwtAuthGuard)
@Controller('games')
export class GamesController {
  constructor(private readonly gameService: GamesService) {}

  @ApiOperation({ summary: 'Get all games' })
  @Get()
  async getAllGames(@UserReq() user) {
    return this.gameService.getAllGames(user.id);
  }

  @ApiOperation({ summary: 'Get one game' })
  @Get('/:id')
  async getGameById(@Param('id') id: number) {
    return this.gameService.getGameById(id);
  }

  @ApiOperation({ summary: 'Get one game' })
  @Delete('/:id')
  async removeGame(@Param('id') id: number) {
    return this.gameService.removeGame(id);
  }

  @ApiOperation({ summary: 'Create game' })
  @Post()
  createGame(@Body() gameDto: CreateGameDto, @UserReq() user) {
    return this.gameService.createGame(gameDto, user.id);
  }

  @ApiOperation({ summary: 'Create game' })
  @Post('/join')
  joinToGame(@Body() joinGameDto: JoinGameDto, @UserReq() user) {
    return this.gameService.joinToGame(joinGameDto, user.id);
  }
}
