import { prisma } from '~/server/prisma'
import { errorHandler, notFoundError } from '~/server/errors'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.activityId as string

    const activity = await prisma.activity.findUnique({
      where: { id },
      include: { season: true },
    })
    if (!activity) throw notFoundError('Activity not found')

    await prisma.$disconnect()

    return activity
  } catch (error) {
    await errorHandler(error)
  }
})
