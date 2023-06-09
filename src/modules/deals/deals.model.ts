import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';

import { DEAL_STATUS } from '../../types/game';

import { Game } from '../games/games.model';
import { Bet } from '../bets/bets.model';

interface DealCreationAttributes {
  gameId: number;
  judgeId: number;
  situationId: number;
}

@Table({ tableName: 'deals' })
export class Deal extends Model<Deal, DealCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    defaultValue: DEAL_STATUS.NOT_STARTED,
  })
  status: DEAL_STATUS;

  @Column({ type: DataType.INTEGER })
  situationId: number;

  @ForeignKey(() => Game)
  @Column({ type: DataType.INTEGER })
  gameId: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  winnerId: number | null;

  @Column({ type: DataType.INTEGER })
  judgeId: number;

  @HasMany(() => Bet)
  bets: Bet[];
}
