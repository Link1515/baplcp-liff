import { errorHandler, notFoundError } from '~/server/errors'
import { seasonService } from '~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.seasonId as string

    const season = await seasonService.findById({ id })
    if (!season) throw notFoundError('Season not found')

    return season
  } catch (error) {
    await errorHandler(error)
  }
})
