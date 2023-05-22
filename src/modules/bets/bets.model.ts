import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';

import { Deal } from '../deals/deals.model';

interface CreationAttributes {
  userId: number;
  dealId: number;
  cardId: number;
}

@Table({ tableName: 'bets' })
export class Bet extends Model<Bet, CreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER })
  userId: number;

  @Column({ type: DataType.INTEGER })
  cardId: number;

  @ForeignKey(() => Deal)
  @Column({ type: DataType.INTEGER })
  dealId: number;
}
