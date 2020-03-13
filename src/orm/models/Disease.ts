import {
  Model,
  Table,
  DataType,
  Column,
  PrimaryKey
} from 'sequelize-typescript';

@Table({
  tableName: 'disease',
  timestamps: false
})
class Disease extends Model<Disease> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Column
  name: string;
}

export default Disease;
