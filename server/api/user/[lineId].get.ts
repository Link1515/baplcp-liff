import { errorHandler, notFoundError } from '~/server/errors'
import { sessionConfig } from '~/server/session'
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

    await updateSession(event, sessionConfig, { user })

    await prisma.$disconnect()

    return { ...user }
  } catch (error) {
    await errorHandler(error)
  }
})
