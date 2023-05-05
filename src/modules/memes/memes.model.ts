import { Model, Table, Column, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface MemeCreationAttributes {
  title: string;
  description: string;
  image: string;
}

@Table({ tableName: 'memes' })
export class Meme extends Model<Meme, MemeCreationAttributes> {
  @ApiProperty({ example: 123, description: 'Uniqe ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Awesome meme', description: 'Meme name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ example: 'Qweqwe qwe', description: 'Meme description' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({ type: DataType.STRING, unique: true })
  image: string;
}
