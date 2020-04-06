import {
  Model,
  Table,
  PrimaryKey,
  Column,
  AutoIncrement,
} from 'sequelize-typescript'

@Table({ tableName: 'drug_side_effects', timestamps: false })
class DrugSideEffects extends Model {
  @PrimaryKey
  @Column
  drugId: number

  @PrimaryKey
  @Column
  group: number

  @PrimaryKey
  @Column
  sideEffectId: number

  @Column
  units: string

  @PrimaryKey
  @Column
  frequency: string
}

export default DrugSideEffects
