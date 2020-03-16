import {
  Model,
  Table,
  DataType,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany
} from 'sequelize-typescript'

import Disease from './Disease'
import DiseaseCase from './DiseaseCase'
import PatientContradictions from './PatientContradictions'
import Status from './Status'

@Table({ tableName: 'patient', timestamps: false })
class Patient extends Model<Patient> {
  @PrimaryKey
  @Column
  id: number

  @Column
  name: string

  @Column(DataType.DATE)
  birth_date: Date

  @ForeignKey(() => Disease)
  @Column
  disease_id: number

  @BelongsTo(() => Disease)
  disease: Disease

  @HasMany(() => DiseaseCase)
  anamnesis: DiseaseCase[]

  @HasMany(() => PatientContradictions)
  contradictions: PatientContradictions[]

  @Column
  current_status_id: number

  @BelongsTo(() => Status, 'current_status_id')
  status: Status

  @Column
  doctor_id: number
}

export default Patient
