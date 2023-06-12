import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { getRandomColor } from '../../helpers/getRandomColor';

import { Situation } from './situations.model';
import { CreateSituationDto } from './dto';
import { BY_YOURSELF_SITUATION } from './constants';

const MADE_UP_SITUATION = {
  id: 0,
  text: BY_YOURSELF_SITUATION,
  description: '',
};

@Injectable()
export class SituationsService {
  constructor(
    @InjectModel(Situation) private situationsRepository: typeof Situation,
  ) {}

  private possibilityOfMadeUpSituation = 0.5;

  async getAllSituations() {
    return await this.situationsRepository.findAll({ include: { all: true } });
  }

  async getMadeUpSituations(count: number) {
    return new Array(Math.ceil(count * this.possibilityOfMadeUpSituation)).fill(
      MADE_UP_SITUATION,
    ) as Situation[];
  }

  async getSituationById(id: number) {
    return await this.situationsRepository.findOne({ where: { id } });
  }

  async createSituation(dto: CreateSituationDto) {
    return await this.situationsRepository.create({
      ...dto,
      colors: [getRandomColor(), getRandomColor()],
    });
  }
}
