import { PrismaClient } from '@prisma/client'
import { notFoundError } from '~/errors'
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
    if (error instanceof Error) {
      if (error.name === 'NOT_FOUND')
        throw createError({
          statusCode: 404,
          statusMessage: error.message,
        })
    }

    console.log(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Server error',
    })
  }
})
