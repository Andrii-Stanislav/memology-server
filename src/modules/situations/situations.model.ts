import { Model, Table, Column, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface CreationAttributes {
  text: string[];
  description?: string;
}

@Table({ tableName: 'situations' })
export class Situation extends Model<Situation, CreationAttributes> {
  @ApiProperty({ example: 123, description: 'Uniqe ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: ['Some fanny text', 'and seccond text'],
    description: 'Text',
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  text: string[];

  @ApiProperty({ example: 'Qweqwe qwe', description: 'Meme description' })
  @Column({
    type: DataType.STRING,
    defaultValue: '',
  })
  description?: string;
}
