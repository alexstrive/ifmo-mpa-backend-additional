import { Sequelize } from 'sequelize'

import sequelize from './sequelize'
import * as fastify from 'fastify'
import * as fastifyPlugin from 'fastify-plugin'

declare module 'fastify' {
  class FastifyInstance {
    sequelize: Sequelize
  }
}

const ORM = async (fastify, options) => {
  await sequelize.sync()

  fastify.decorate('sequelize', sequelize)
}

export default fastifyPlugin(ORM)
