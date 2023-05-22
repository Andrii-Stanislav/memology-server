import { Controller, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserReq, JwtAuthGuard } from '../../guards';

import { DealsService } from './deals.service';
import { UpdateDealDto } from './dto';

@ApiBearerAuth()
@ApiTags('Deals route')
@UseGuards(JwtAuthGuard)
@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Patch('/:id')
  async updateDeal(
    @Param('id') id: number,
    @Body() dto: UpdateDealDto,
    @UserReq() user,
  ) {
    return this.dealsService.updateDeal(id, user.id, dto);
  }
}
