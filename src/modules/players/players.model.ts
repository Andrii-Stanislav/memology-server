import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { Game } from '../games/games.model';

import { PLAYER_STATUS } from '../../types/game';

interface CreationAttributes {
  name: string;
  cards: string;
  userId: number;
  gameId: number;
}

@Table({ tableName: 'players' })
export class Player extends Model<Player, CreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({
    type: DataType.STRING,
    defaultValue: PLAYER_STATUS.WAITING,
  })
  status: string;

  @Column({ type: DataType.STRING(9999) })
  cards: string;

  // @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => Game)
  @Column({ type: DataType.INTEGER })
  gameId: number;

  @BelongsTo(() => Game)
  game: Game;
}
