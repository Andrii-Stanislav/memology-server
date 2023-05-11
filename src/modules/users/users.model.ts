import {
  Model,
  Table,
  Column,
  DataType,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Game } from '../games/games.model';
import { GamesToUser } from '../games/gamesToUser.model';

interface UserCreationAttributes {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: 123, description: 'Uniqe ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'qweqwe@gmail.com', description: 'User email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: 'asd123', description: 'Password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: true })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;

  @ApiProperty({ example: 'Bad boy', description: 'Ban reason' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  banReason: string;

  @HasMany(() => Game)
  createdGames: Game[];

  @BelongsToMany(() => Game, () => GamesToUser)
  games: Game[];
}
