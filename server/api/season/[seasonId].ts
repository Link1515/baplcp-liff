import { prisma } from '~/server/prisma'
import { errorHandler, notFoundError } from '~/server/errors'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.seasonId as string

    const season = await prisma.season.findUnique({
      where: { id },
      include: { activity: true },
    })
    if (season === null) throw notFoundError('Season not found')

    await prisma.$disconnect()

    return season
  } catch (error) {
    await errorHandler(error)
  }
})
