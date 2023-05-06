import { prisma } from '~/server/prisma'

export default defineEventHandler(async (event) => {
  try {
    const activityId = event.context.params?.activityId as string

    const records = prisma.joinRecordPerActivity.findMany({
      where: { activityId, active: true },
      orderBy: { updatedAt: 'asc' },
      include: { user: true },
    })

    await prisma.$disconnect()

    return records
  } catch (error) {
    await prisma.$disconnect()

    throw createError({
      statusCode: 500,
      statusMessage: 'Server error',
    })
  }
})
