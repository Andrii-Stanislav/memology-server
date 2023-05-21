import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { PLAYER_STATUS } from '../../types/game';

import { Game } from '../games/games.model';

interface CreationAttributes {
  name: string;
  cards: number[];
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

  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
  })
  cards: number[];

  // @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => Game)
  @Column({ type: DataType.INTEGER })
  gameId: number;

  @BelongsTo(() => Game)
  game: Game;
}
