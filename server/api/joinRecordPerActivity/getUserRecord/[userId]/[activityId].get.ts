import { prisma } from '~/server/prisma'

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.params?.userId as string
    const activityId = event.context.params?.activityId as string

    const record = await prisma.joinRecordPerActivity.findFirst({
      where: { userId, activityId, active: true },
    })

    await prisma.$disconnect()

    return record
  } catch (error) {
    await prisma.$disconnect()

    throw createError({
      statusCode: 500,
      statusMessage: 'Server error',
    })
  }
})
