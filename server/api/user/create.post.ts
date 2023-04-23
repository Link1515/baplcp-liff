import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { sessionConfig } from '~/server/sessionConfig'

const userCreateBodySchema = z.object({
  realName: z.string({
    required_error: 'realName is required.',
    invalid_type_error: 'realName must be a string.',
  }),
  lineId: z.string({
    required_error: 'lineId is required.',
    invalid_type_error: 'lineId must be a string.',
  }),
})

type userCreateBody = z.infer<typeof userCreateBodySchema>

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()

  try {
    const body = await readBody<userCreateBody>(event)

    userCreateBodySchema.parse(body)

    const user = await prisma.user.create({
      data: body,
    })

    await updateSession(event, sessionConfig, { user })

    await prisma.$disconnect()

    return { ...user }
  } catch (error) {
    await prisma.$disconnect()

    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: error.issues.map((issue) => issue.message).join(' '),
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Server error',
    })
  }
})
