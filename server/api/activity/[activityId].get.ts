import { prisma } from '~/server/prisma'
import { ErrorWithCode, notFoundError } from '~/server/errors'

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
    await prisma.$disconnect()

    if (error instanceof ErrorWithCode) {
      throw createError({
        statusCode: error.code,
        statusMessage: error.message,
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Server error',
    })
  }
})
