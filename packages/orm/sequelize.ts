import { Sequelize } from 'sequelize-typescript'

const sequelize = new Sequelize(
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_DOMAIN}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
  { logging: false, models: [__dirname + '/models'] }
)

// sequelize.query('DROP TYPE enum_disease_contradictions_level')

export default sequelize
