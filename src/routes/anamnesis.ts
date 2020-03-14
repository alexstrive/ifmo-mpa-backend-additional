import * as fastify from 'fastify';
import * as moment from 'moment';

import Patient from '@ifmo/orm/models/Patient';
import DiseaseCase from '@ifmo/orm/models/DiseaseCase';
import Disease from '@ifmo/orm/models/Disease';
import PatientContradiction from '@ifmo/orm/models/PatientContradictions';

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
      attributes: ['id', 'state'],
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
          diseaseId: { type: 'number' },
          state: { type: 'string' }
        }
      }
    }
  };

  fastify.post('/anamnesis', postAnamnesisOptions, async (request, reply) => {
    const { patientId, diseaseId, state } = request.body;

    const patient = await Patient.findByPk(patientId);
    const disease = await Disease.findByPk(diseaseId);

    const newCase = await DiseaseCase.create({ state });

    newCase.setPatient(patient);
    newCase.setDisease(disease);

    reply.send();
  });

  const deleteAnamnesisOptions: fastify.RouteShorthandOptions = {
    schema: {
      body: {
        type: 'object',
        required: ['recordId'],
        properties: {
          recordId: { type: 'number' }
        }
      }
    }
  };

  fastify.delete(
    '/anamnesis',
    deleteAnamnesisOptions,
    async (request, reply) => {
      const { recordId } = request.body;

      const diseaseCase = await DiseaseCase.findByPk(recordId);

      diseaseCase.destroy();

      return {};
    }
  );
};
