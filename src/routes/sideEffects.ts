import * as fastify from 'fastify'

import SideEffect from '../../packages/orm/models/SideEffect'
import DrugSideEffects from '../../packages/orm/models/DrugSideEffects'

export default async (fastify: fastify.FastifyInstance, routeOptions) => {
  const getSideEffects: fastify.RouteShorthandOptions = {
    schema: {
      querystring: {
        type: 'object',
        required: ['drugId'],
        properties: {
          drugId: {
            type: 'number',
          },
        },
      },
    },
  }

  fastify.get('/sideEffects', getSideEffects, async (request, reply) => {
    const { drugId } = request.query

    const sideEffectsForDrug = await DrugSideEffects.findAll({
      where: { drugId },
    })

    const groupedSideEffects = sideEffectsForDrug.reduce(
      (allSideEffects, currentSideEffect) => {
        let previousSideEffectsForCurrentGroup =
          allSideEffects[currentSideEffect.group] || []

        return {
          ...allSideEffects,
          [currentSideEffect.group]: [
            ...previousSideEffectsForCurrentGroup,
            {
              id: currentSideEffect.sideEffectId,
              frequency: currentSideEffect.frequency,
            },
          ],
        }
      },
      {}
    )

    const groupedSideEffectsWithUnits = Object.entries(groupedSideEffects).map(
      ([sideEffectGroupId, sideEffectGroupItems]) => ({
        units:
          sideEffectsForDrug[
            sideEffectsForDrug.findIndex(
              (sideEffect) => sideEffect.group == sideEffectGroupId
            )
          ].units,
        items: sideEffectGroupItems,
      })
    )

    return groupedSideEffectsWithUnits
  })

  const getSupportedOptions: fastify.RouteShorthandOptions = {
    schema: {},
  }

  fastify.get(
    '/sideEffects/supportedIds',
    getSupportedOptions,
    async (request, reply) => {
      return (await SideEffect.findAll()).map((sideEffect) => sideEffect.id)
    }
  )

  const putSideEffectsOptions: fastify.RouteShorthandOptions = {
    schema: {
      body: {
        type: 'object',
        required: ['drugId', 'units', 'items'],
        properties: {
          drugId: {
            type: 'number',
          },
          units: {
            type: 'string',
          },
          items: {
            type: 'array',
          },
        },
      },
    },
  }

  fastify.put('/sideEffects', putSideEffectsOptions, async (request, reply) => {
    const { drugId, units, items } = request.body
    const maxGroupId = (await DrugSideEffects.max('group')) || 0

    DrugSideEffects.bulkCreate(
      items.map((sideEffect) => ({
        drugId,
        group: maxGroupId + 1,
        sideEffectId: sideEffect.id,
        units,
        frequency: sideEffect.frequency,
      }))
    )
  })
}
