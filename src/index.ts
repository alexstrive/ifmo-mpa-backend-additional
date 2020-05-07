require('dotenv').config()

import { AddressInfo } from 'net'

import orm from '../packages/orm'
import anamnesis from './routes/anamnesis'
import contradictions from './routes/contradictions'
import sideEffects from './routes/sideEffects'

const fastify = require('fastify')
const fastifyFormbody = require('fastify-formbody')
const fastifyCors = require('fastify-cors')

const server = fastify({ logger: process.env.PRODUCTION })

server.register(fastifyFormbody)
server.register(fastifyCors, { origin: /localhost.*/ })

server.register(orm)
server.register(anamnesis)
server.register(contradictions)
server.register(sideEffects)

server.listen(process.env.PORT, '0.0.0.0', (err) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
  server.log.info(
    `server listening on ${(server.server.address() as AddressInfo).port}`
  )
})
