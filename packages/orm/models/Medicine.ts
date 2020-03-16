import { Table, Column, Model, HasOne, HasMany } from 'sequelize-typescript'
import ActiveSubstanceInMedicine from './ActiveSubstanceInMedicine'

@Table({ tableName: 'medicine', timestamps: false })
class Medicine extends Model {
  @Column
  name: string

  @HasMany(() => ActiveSubstanceInMedicine, 'medicine_id')
  substances: ActiveSubstanceInMedicine
}

export default Medicine
