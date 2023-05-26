import { errorHandler, notFoundError } from '~/server/errors'
import { prisma } from '~/server/prisma'

export default defineEventHandler(async (event) => {
  const lineId = event.context.params?.lineId as string

  try {
    const user = await prisma.user.findUnique({
      where: { lineId },
    })

    if (!user) {
      throw notFoundError('User not found')
    }

    await prisma.$disconnect()

    return { ...user }
  } catch (error) {
    await errorHandler(error)
  }
})
