import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserReq, JwtAuthGuard } from '../../guards';
import { CreateBetDto } from '../bets/dto';

import { PlayersService } from './players.service';
import { UpdatePlayerDto } from './dto';

@ApiBearerAuth()
@ApiTags('Players route')
@UseGuards(JwtAuthGuard)
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async getAll() {
    return this.playersService.getAllPlayers();
  }

  @Get('?')
  async getAllByGameId(@Query('gameId') gameId?: number) {
    return this.playersService.getGamePlayers(gameId);
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    return this.playersService.getPlayerById(id);
  }

  @Patch('/:id')
  async updatePlayer(@Param('id') id: number, @Body() dto: UpdatePlayerDto) {
    return this.playersService.updatePlayer(id, dto);
  }

  @Patch('/:id/bet')
  async makeBet(
    @Param('id') id: number,
    @UserReq() user,
    @Body() betDto: CreateBetDto,
  ) {
    return this.playersService.createBet(id, user.id, betDto);
  }

  @Delete('/:id')
  deletePlayer(@Param('id') id: number) {
    return this.playersService.removePlayer(id);
  }
}
