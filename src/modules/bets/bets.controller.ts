import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserReq, JwtAuthGuard } from '../../guards';

import { BetsService } from './bets.service';
import { CreateBetDto } from './dto';

@ApiBearerAuth()
@ApiTags('Bets route')
@UseGuards(JwtAuthGuard)
@Controller('bets')
export class BetsController {
  constructor(private readonly betsService: BetsService) {}

  @Post()
  async createBet(@Body() dto: CreateBetDto, @UserReq() user) {
    return this.betsService.createBet(dto, user.id);
  }
}
