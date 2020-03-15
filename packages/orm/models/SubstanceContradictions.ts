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

@Table({ tableName: 'substance_contradictions' })
class SubstanceContradictions extends Model {
  @Index
  @PrimaryKey
  @Column
  substanceId: number

  @BelongsTo(() => Substance, 'substanceId')
  substance: Substance

  @Index
  @PrimaryKey
  @Column
  withSubstanceId: number

  @BelongsTo(() => Substance, 'withSubstanceId')
  withSubstance: Substance

  @Column(DataType.ENUM('LIGHT', 'AVERAGE', 'HIGH'))
  level: string
}

export default SubstanceContradictions
