import { errorHandler } from '~/server/errors'
import { seasonService } from '~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const seasonList = await seasonService.findMany()

    return seasonList
  } catch (error) {
    await errorHandler(error)
  }
})
