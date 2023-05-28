import { prisma } from '~/server/prisma'
import { errorHandler, notFoundError } from '~/server/errors'
import { activityService } from '~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.activityId as string

    const activity = await activityService.findById({ id })
    if (!activity) throw notFoundError('Activity not found')

    return activity
  } catch (error) {
    await errorHandler(error)
  }
})
