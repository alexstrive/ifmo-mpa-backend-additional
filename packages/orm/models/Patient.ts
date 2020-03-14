import {
  Model,
  Table,
  DataType,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';

import Disease from './Disease';

@Table({ tableName: 'patient', timestamps: false })
class Patient extends Model<Patient> {
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Column(DataType.DATE)
  birth_date: Date;

  @ForeignKey(() => Disease)
  @Column
  disease_id: number;

  @BelongsTo(() => Disease)
  disease: Disease;

  @Column
  current_status_id: number;

  @Column
  doctor_id: number;
}

export default Patient;
