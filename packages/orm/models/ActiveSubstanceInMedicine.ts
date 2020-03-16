import { Model, Table, Column, BelongsTo } from 'sequelize-typescript'
import Medicine from './Medicine'
import Substance from './Substance'

@Table({ tableName: 'active_substance_in_medicine', timestamps: false })
class ActiveSubstanceInMedicine extends Model {
  @Column
  active_substance_id: number

  @Column
  medicine_id: number

  @BelongsTo(() => Medicine, 'medicine_id')
  medicine: Medicine

  @BelongsTo(() => Substance, 'active_substance_id')
  substance: Substance
}

export default ActiveSubstanceInMedicine
