import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Deal } from './deals.model';
import { CreateDealDto, UpdateDealDto } from './dto';

@Injectable()
export class DealsService {
  constructor(@InjectModel(Deal) private dealRepository: typeof Deal) {}

  async createDeal(dto: CreateDealDto) {
    return await this.dealRepository.create(dto);
  }

  async updateDeal(dealId: number, judgeId: number, dto: UpdateDealDto) {
    return await this.dealRepository.update(dto, {
      where: { id: dealId, judgeId },
    });
  }
}
