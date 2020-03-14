import {
  Table,
  Model,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Index,
  AutoIncrement,
  Default
} from 'sequelize-typescript';

import Patient from './Patient';
import Disease from './Disease';

@Table({ timestamps: true, tableName: 'disease_case' })
class DiseaseCase extends Model<DiseaseCase> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => Patient)
  @Column
  patientId!: number;

  @ForeignKey(() => Disease)
  @Column
  diseaseId!: number;

  @BelongsTo(() => Disease)
  disease: Disease;

  @BelongsTo(() => Patient)
  patient: Patient;

  @Default('HEALED')
  @Column(DataType.ENUM('ACTIVE', 'HEALED'))
  state!: string;
}

export default DiseaseCase;
