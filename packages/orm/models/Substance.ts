import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AutoIncrement
} from 'sequelize-typescript';

@Table({ tableName: 'active_substance', timestamps: false })
class Substance extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  name!: string;
}

export default Substance;
