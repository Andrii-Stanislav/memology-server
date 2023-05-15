import { Controller, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { PlayersService } from './players.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../guards';

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

  @Get('/:id')
  async getById(@Param('id') id: number) {
    return this.playersService.getPlayerById(id);
  }

  @Delete('/:id')
  deletePlayer(@Param('id') id: number) {
    return this.playersService.removePlayer(id);
  }
}
