import Disease from './Disease'
import Substance from './Substance'
import {
  Table,
  Column,
  PrimaryKey,
  BelongsTo,
  Model,
  DataType,
  Index
} from 'sequelize-typescript'

@Table({ tableName: 'disease_contradictions' })
class DiseaseContradictions extends Model {
  @Index
  @PrimaryKey
  @Column
  diseaseId: number

  @BelongsTo(() => Disease, 'diseaseId')
  disease: Disease

  @PrimaryKey
  @Column(DataType.ENUM('ACTIVE', 'HEALED'))
  state: string

  @Index
  @PrimaryKey
  @Column
  withSubstanceId: number

  @BelongsTo(() => Substance, 'withSubstanceId')
  withSubstance: Substance

  @Column(DataType.ENUM('LIGHT', 'AVERAGE', 'HIGH'))
  level: string
}

export default DiseaseContradictions
