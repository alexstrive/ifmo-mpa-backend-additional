import * as fastify from 'fastify'

import Patient from '@alexstrive/ifmo-mpa-orm/models/Patient'
import DiseaseCase from '@alexstrive/ifmo-mpa-orm/models/DiseaseCase'

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
  }

  fastify.get('/anamnesis', getAnamnesisOptions, async (request, reply) => {
    const { patientId } = request.query

    const patient = await Patient.findByPk(patientId, {
      include: [{ model: DiseaseCase, as: 'anamnesis' }]
    })

    return patient.anamnesis
  })

  const postAnamnesisOptions: fastify.RouteShorthandOptions = {
    schema: {
      body: {
        type: 'object',
        required: ['patientId', 'cases'],
        properties: {
          patientId: { type: 'number' },
          cases: {
            type: 'array',
            items: {
              type: 'object',
              required: ['diseaseId'],
              properties: {
                diseaseId: { type: 'number' },
                state: { type: 'string' }
              }
            }
          }
        }
      }
    }
  }

  fastify.post('/anamnesis', postAnamnesisOptions, async (request, reply) => {
    const { patientId, cases } = request.body

    const patient = await Patient.findByPk(patientId)

    DiseaseCase.destroy({ where: { patientId: patient.id } })

    const newCases = DiseaseCase.bulkCreate(
      cases.map((diseaseCase) => ({
        patientId: Number.parseInt(patient.id),
        diseaseId: diseaseCase.diseaseId,
        state: diseaseCase.state
      }))
    )

    return newCases
  })

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
  }

  fastify.delete(
    '/anamnesis',
    deleteAnamnesisOptions,
    async (request, reply) => {
      const { recordId } = request.body

      const diseaseCase = await DiseaseCase.findByPk(recordId)

      diseaseCase.destroy()

      return diseaseCase
    }
  )
}
