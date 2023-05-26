import { prisma } from '~/server/prisma'
import { errorHandler } from '~/server/errors'

export default defineEventHandler(async (event) => {
  try {
    const activityId = event.context.params?.activityId as string

    const records = prisma.joinRecordPerActivity.findMany({
      where: { activityId, active: true },
      orderBy: [{ user: { isAdmin: 'desc' } }, { joinedAt: 'asc' }],
      include: { user: true },
    })

    await prisma.$disconnect()

    return records
  } catch (error) {
    await errorHandler(error)
  }
})
