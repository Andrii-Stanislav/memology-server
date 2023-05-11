import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

import { DEAL_STATUS } from '../../types/game';
import { Game } from '../games/games.model';

interface DealCreationAttributes {
  gameId: number;
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
    defaultValue: DEAL_STATUS.STARTED,
  })
  status: DEAL_STATUS;

  @ForeignKey(() => Game)
  @Column({ type: DataType.INTEGER })
  gameId: number;

  @BelongsTo(() => Game)
  game: Game;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  vinnerId: null;

  // TODO
  // @HasMany(() => Bet)
  // bets: Bet[];
}
