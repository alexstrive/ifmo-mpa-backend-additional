import { Model, Table, HasMany, Column } from 'sequelize-typescript'

@Table({ tableName: 'prescription', timestamps: false })
class Prescription extends Model {
  @Column
  status_id: number

  @Column
  medicine_id: number
}

export default Prescription
