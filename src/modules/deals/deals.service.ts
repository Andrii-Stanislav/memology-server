import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Deal } from './deals.model';

@Injectable()
export class DealsService {
  constructor(@InjectModel(Deal) private dealRepository: typeof Deal) {}

  async createDeal() {
    const deal = await this.dealRepository.create();
    return deal;
  }

  // TODO
}
