import { Model, Table, HasMany, Column } from 'sequelize-typescript'

@Table({ tableName: 'side_effects', timestamps: false })
class SideEffect extends Model {}

export default SideEffect
