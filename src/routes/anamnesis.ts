import * as fastify from 'fastify'
import * as moment from 'moment'

import Patient from '@ifmo/orm/models/Patient'
import DiseaseCase from '@ifmo/orm/models/DiseaseCase'
import Disease from '@ifmo/orm/models/Disease'
import PatientContradiction from '@ifmo/orm/models/PatientContradictions'
import Substance from '@ifmo/orm/models/Substance'
import ActiveSubstanceInMedicine from '@ifmo/orm/models/ActiveSubstanceInMedicine'

import Status from '@ifmo/orm/models/Status'
import Medicine from '@ifmo/orm/models/Medicine'
const getAge = (birthday) => moment(Date.now()).diff(birthday, 'year')

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
        required: ['patientId', 'diseaseId'],
        properties: {
          patientId: { type: 'number' },
          diseaseId: { type: 'number' },
          state: { type: 'string' }
        }
      }
    }
  }

  fastify.post('/anamnesis', postAnamnesisOptions, async (request, reply) => {
    const { patientId, diseaseId, state } = request.body

    const patient = await Patient.findByPk(patientId)
    const disease = await Disease.findByPk(diseaseId)

    const newCase = await DiseaseCase.create({ state })

    newCase.setPatient(patient)
    newCase.setDisease(disease)

    return newCase
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
