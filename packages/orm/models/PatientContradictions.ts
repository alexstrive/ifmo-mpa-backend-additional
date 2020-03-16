import {
  Model,
  Table,
  Column,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  DataType,
  Index,
  AutoIncrement,
  Default
} from 'sequelize-typescript'
import Patient from './Patient'
import Substance from './Substance'

@Table({
  tableName: 'patient_contradictions'
})
class PatientContradictions extends Model {
  @AutoIncrement
  @Column
  id!: number

  @BelongsTo(() => Patient, 'patientId')
  patient!: Patient

  @PrimaryKey
  @Index
  @ForeignKey(() => Patient)
  @Column
  patientId!: number

  @PrimaryKey
  @Default('OTHER')
  @Column(DataType.ENUM('OTHER', 'SUBSTANCE', 'DISEASE'))
  reasonType!: string

  @PrimaryKey
  @Column
  reasonId: number

  @Default('LIGHT')
  @Column(DataType.ENUM('LIGHT', 'AVERAGE', 'HIGH'))
  level: string

  @BelongsTo(() => Substance, 'substanceId')
  substance: Substance

  @PrimaryKey
  @ForeignKey(() => Substance)
  @Column
  substanceId: number
}

export default PatientContradictions
