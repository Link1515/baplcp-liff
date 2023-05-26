import { errorHandler } from '~/server/errors'
import { prisma } from '~/server/prisma'
import { sessionConfig } from '~/server/session'
import { userPostBodySchema, UserPostBodySchema } from '~/server/bodySchema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<UserPostBodySchema>(event)

    userPostBodySchema.parse(body)

    const user = await prisma.user.create({ data: body })

    await updateSession(event, sessionConfig, { user })

    await prisma.$disconnect()

    return { ...user }
  } catch (error) {
    await errorHandler(error)
  }
})
