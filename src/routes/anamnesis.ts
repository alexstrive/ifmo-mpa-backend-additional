import * as fastify from 'fastify';
import * as moment from 'moment';

import Patient from '../orm/models/Patient';
import DiseaseCase from '../orm/models/DiseaseCase';
import Disease from '../orm/models/Disease';

const getAge = (birthday) => moment(Date.now()).diff(birthday, 'year');

export default async (fastify: fastify.FastifyInstance, routeOptions) => {
  const getAnamnesisOptions: fastify.RouteShorthandOptions = {
    schema: {
      querystring: {
        type: 'object',
        required: ['patientId'],
        properties: {
          patientId: { type: 'number' }
        }
      }
    }
  };

  fastify.get('/anamnesis', getAnamnesisOptions, async (request, reply) => {
    const { patientId } = request.query;

    const patient = await Patient.findByPk(patientId);

    const diseaseCases = await DiseaseCase.findAll({
      where: { patientId },
      attributes: ['id'],
      include: [Disease]
    });

    return {
      age: getAge(patient.birth_date),
      records: diseaseCases
    };
  });

  const postAnamnesisOptions: fastify.RouteShorthandOptions = {
    schema: {
      body: {
        type: 'object',
        required: ['patientId', 'diseaseId'],
        properties: {
          patientId: { type: 'number' },
          diseaseId: { type: 'number' }
        }
      }
    }
  };

  fastify.post('/anamnesis', postAnamnesisOptions, async (request, reply) => {
    const { patientId, diseaseId } = request.body;

    const patient = await Patient.findByPk(patientId);
    const disease = await Disease.findByPk(diseaseId);

    const newCase = await DiseaseCase.create();

    newCase.setPatient(patient);
    newCase.setDisease(disease);

    reply.send();
    return;
  });
};
