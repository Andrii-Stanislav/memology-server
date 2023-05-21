import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import {
  ApiSecurity,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard, SuperAdminGuard } from '../../guards';

import { SituationsService } from './situations.service';
import { Situation } from './situations.model';
import { CreateSituationDto } from './dto';

@ApiSecurity('super-admin')
@ApiBearerAuth()
@ApiTags('Situation route')
@UseGuards(JwtAuthGuard)
@Controller('situations')
export class SituationsController {
  constructor(private readonly situationsService: SituationsService) {}

  @ApiOperation({ summary: 'Get all situations' })
  @ApiResponse({ status: 200, type: [Situation] })
  @Get()
  getAllSituations() {
    return this.situationsService.getAllSituations();
  }

  @ApiOperation({ summary: 'Get made up situation' })
  @ApiResponse({ status: 200, type: Situation })
  @Get('/made-up')
  getMadeUpSituation() {
    return this.situationsService.getMadeUpSituations(1);
  }

  @ApiOperation({ summary: 'Get one situation' })
  @ApiResponse({ status: 200, type: Situation })
  @Get('/:id')
  getSituationById(@Param('id') id: number) {
    return this.situationsService.getSituationById(id);
  }

  @UseGuards(SuperAdminGuard)
  @ApiOperation({ summary: 'Create situation' })
  @ApiResponse({ status: 200, type: Situation })
  @Post()
  createSituation(@Body() dto: CreateSituationDto) {
    return this.situationsService.createSituation(dto);
  }
}
