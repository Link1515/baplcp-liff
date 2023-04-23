import { PrismaClient } from '@prisma/client'
import { ErrorWithCode, notFoundError } from '~/server/errors'
import { sessionConfig } from '~/server/sessionConfig'

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
  const lineId = event.context.params?.lineId as string

  try {
    const user = await prisma.user.findUnique({
      where: {
        lineId,
      },
    })

    if (!user) {
      throw notFoundError
    }

    await updateSession(event, sessionConfig, { user })

    await prisma.$disconnect()

    return { ...user }
  } catch (error) {
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
