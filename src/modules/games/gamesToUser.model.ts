import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';

import { User } from '../users/users.model';

import { Game } from './games.model';

interface CreationAttributes {
  userId: number;
  gameId: number;
}

@Table({ tableName: 'gamesToUser' })
export class GamesToUser extends Model<GamesToUser, CreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => Game)
  @Column({ type: DataType.INTEGER })
  gameId: number;
}
