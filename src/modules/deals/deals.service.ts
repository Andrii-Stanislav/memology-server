import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Deal } from './deals.model';
import { CreateDealDto } from './dto';

@Injectable()
export class DealsService {
  constructor(@InjectModel(Deal) private dealRepository: typeof Deal) {}

  async createDeal(dto: CreateDealDto) {
    return await this.dealRepository.create(dto);
  }
}
