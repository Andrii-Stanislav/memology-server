import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  BelongsToMany,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';

import { User } from '../users/users.model';
import { Player } from '../players/players.model';
import { Deal } from '../deals/deals.model';
import { ApiProperty } from '@nestjs/swagger';

import { generateGameJoinCode } from '../../helpers/generateGameJoinCode';
import { GAME_STATUS } from '../../types/game';

interface CreationAttributes {
  title: string;
  creatorId: number;
  playersCount?: number;
  cardsOnHands?: number;
  cards: string;
}

@Table({ tableName: 'games' })
export class Game extends Model<Game, CreationAttributes> {
  @ApiProperty({ example: 123, description: 'Uniqe ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Awesome title', description: 'Game title' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ example: 'STARTED', description: 'Game proccess status' })
  @Column({
    type: DataType.STRING,
    defaultValue: GAME_STATUS.NOT_STARTED,
    allowNull: false,
  })
  status: GAME_STATUS;

  @ApiProperty({
    example: '123456',
    description: 'Not very secret code for join to game',
  })
  @Column({
    type: DataType.STRING,
    defaultValue: generateGameJoinCode(),
    allowNull: false,
  })
  joinCode: string;

  @ApiProperty({ example: 123, description: 'Current deal Id' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  currentDealId: null;

  @HasMany(() => Deal)
  deals: Deal[];

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  creatorId: number;

  @ApiProperty({ example: User, description: 'Author of this sh*t' })
  @BelongsTo(() => User)
  creator: User;

  @ApiProperty({ example: 4, description: 'Players count' })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 3,
  })
  playersCount: number;

  @ApiProperty({ example: 5, description: 'Cards on hands' })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 5,
  })
  cardsOnHands: number;

  @HasMany(() => Player)
  players: Player[];

  @ApiProperty({ example: '1, 2, 3, 4', description: 'String with memes IDs' })
  @Column({ type: DataType.STRING(9999) })
  cards: string;
}
