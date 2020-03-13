require('dotenv').config();

import { AddressInfo } from 'net';

import orm from './orm';
import anamnesis from './routes/anamnesis';

const fastify = require('fastify');
const fastifyFormbody = require('fastify-formbody');

const server = fastify({ logger: true });

server.register(fastifyFormbody);

server.register(orm);
server.register(anamnesis);

server.listen(3000, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(
    `server listening on ${(server.server.address() as AddressInfo).port}`
  );
});
