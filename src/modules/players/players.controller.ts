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
import { PlayersService } from './players.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../guards';

import { UpdatePlayerDto } from './dto';

@ApiBearerAuth()
@ApiTags('Players route')
@UseGuards(JwtAuthGuard)
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async getAll(@Query('gameId') gameId?: number) {
    if (gameId) {
      return this.playersService.getGamePlayers(gameId);
    }
    return this.playersService.getAllPlayers();
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
