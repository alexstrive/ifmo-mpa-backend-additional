import {
  Model,
  Table,
  Column,
  BelongsTo,
  HasMany,
  BelongsToMany
} from 'sequelize-typescript'
import Patient from './Patient'
import Prescription from './Prescription'
import Medicine from './Medicine'

@Table({ tableName: 'status', timestamps: false })
class Status extends Model {
  @Column
  patient_id: number

  @BelongsToMany(
    () => Medicine,
    () => Prescription,
    'status_id',
    'medicine_id'
  )
  medicines: Medicine[]

  @Column
  state_id: number

  @Column
  is_draft: boolean
}

export default Status
