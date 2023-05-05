import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

import { User } from '../users/users.model';

import { generateGameJoinCode } from '../../helpers/generateGameJoinCode';
import { GAME_STATUS } from '../../types/game';

interface GameCreationAttributes {
  title: string;
  description?: string;
  creatorId: number;
}

@Table({ tableName: 'games' })
export class Game extends Model<Game, GameCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    defaultValue: GAME_STATUS.NOT_STARTED,
    allowNull: false,
  })
  status: GAME_STATUS;

  @Column({
    type: DataType.STRING,
    defaultValue: generateGameJoinCode(),
    allowNull: false,
  })
  joinCode: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  creatorId: number;

  @BelongsTo(() => User)
  creator: User;
}
