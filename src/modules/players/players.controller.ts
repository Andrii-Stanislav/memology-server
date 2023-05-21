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

import { JwtAuthGuard } from '../../guards';

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

  @Delete('/:id')
  deletePlayer(@Param('id') id: number) {
    return this.playersService.removePlayer(id);
  }
}
