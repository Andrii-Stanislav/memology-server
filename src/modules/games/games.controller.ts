import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserReq, JwtAuthGuard } from '../../guards';

import { CreateGameDto, JoinGameDto, CreateDeaDto } from './dto';

@ApiBearerAuth()
@ApiTags('Games route')
@UseGuards(JwtAuthGuard)
@Controller('games')
export class GamesController {
  constructor(private readonly gameService: GamesService) {}

  @ApiOperation({ summary: 'Get all games' })
  @Get()
  async getAllGames() {
    return this.gameService.getAllGames();
  }

  @ApiOperation({ summary: 'Get all created games' })
  @Get('/created')
  async getAllCreatedGames(@UserReq() user) {
    return this.gameService.getAllCreatedGames(user.id);
  }

  @ApiOperation({ summary: 'Get all participated games' })
  @Get('/participated')
  async getAllParticipatedGames(@UserReq() user) {
    return this.gameService.getAllParticipatedGames(user.id);
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

  @ApiOperation({ summary: 'Join game' })
  @Post('/join')
  joinToGame(@Body() joinGameDto: JoinGameDto, @UserReq() user) {
    return this.gameService.joinToGame(joinGameDto, user.id);
  }

  @ApiOperation({ summary: 'Create new deal' })
  @Patch(`/:id/deal`)
  createNewDeal(@Param('id') id: number, @Body() dto: CreateDeaDto) {
    return this.gameService.createNewDeal(id, dto.judgeId);
  }
}
