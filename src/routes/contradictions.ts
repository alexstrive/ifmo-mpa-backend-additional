import * as fastify from 'fastify';

import { Op } from 'sequelize';

import Patient from '@ifmo/orm/models/Patient';
import DiseaseCase from '@ifmo/orm/models/DiseaseCase';
import Disease from '@ifmo/orm/models/Disease';
import PatientContradiction from '@ifmo/orm/models/PatientContradictions';
import Substance from '@ifmo/orm/models/Substance';

export default async (fastify: fastify.FastifyInstance, routeOptions) => {
  const getContradictionsOptions: fastify.RouteShorthandOptions = {
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

  fastify.get(
    '/contradictions',
    getContradictionsOptions,
    async (request, reply) => {
      const { patientId } = request.query;

      const contradictions = await PatientContradiction.findAll({
        where: { patientId },
        include: [Substance]
      });

      const result = contradictions.reduce(
        (others, contradiction) => [
          ...others,
          {
            reason: {
              type: contradiction.reasonType,
              id: contradiction.reasonId
            },
            substance: { id: contradiction.substance?.id },
            level: contradiction.level
          }
        ],
        []
      );

      return result;
    }
  );

  const postContradictionsOptions: fastify.RouteShorthandOptions = {
    schema: {
      body: {
        type: 'object',
        required: ['patientId', 'reasonType', 'reasonId', 'substanceId'],
        properties: {
          patientId: { type: 'number' },
          reasonType: {
            type: 'string',
            enum: ['SUBSTANCE', 'DISEASE', 'OTHER']
          },
          reasonId: { type: 'number' },
          substanceId: { type: 'number' },
          level: { type: 'string', enum: ['LIGHT', 'AVERAGE', 'HIGH'] }
        }
      }
    }
  };

  fastify.post(
    '/contradictions',
    postContradictionsOptions,
    async (request, reply) => {
      const {
        patientId,
        reasonId,
        reasonType,
        substanceId,
        level
      } = request.body;

      let patient;

      try {
        patient = await Patient.findByPk(patientId, {
          rejectOnEmpty: true
        });
      } catch (e) {
        throw new Error(
          `Patient with provided "patientId": ${patientId} not found`
        );
      }

      let substance;

      try {
        substance = await Substance.findByPk(substanceId, {
          rejectOnEmpty: true
        });
      } catch (e) {
        throw new Error(
          `Substance with provided "substanceId": ${substanceId} not found`
        );
      }

      const contradiction = PatientContradiction.create({
        patientId: patient.id,
        substanceId: substance.id,
        reasonId,
        reasonType,
        level
      });

      return contradiction;
    }
  );

  const deleteContradictionsOptions: fastify.RouteShorthandOptions = {
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
    '/contradictions',
    deleteContradictionsOptions,
    async (request, reply) => {
      return {};
    }
  );
};
