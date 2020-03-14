require('dotenv').config();

import { AddressInfo } from 'net';

import orm from '../packages/orm';
import anamnesis from './routes/anamnesis';
import contradictions from './routes/contradictions';

const fastify = require('fastify');
const fastifyFormbody = require('fastify-formbody');

const server = fastify({ logger: process.env.PRODUCTION });

server.register(fastifyFormbody);

server.register(orm);
server.register(anamnesis);
server.register(contradictions);

server.listen(3000, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(
    `server listening on ${(server.server.address() as AddressInfo).port}`
  );
});
