import { z } from 'zod'
import { errorHandler } from '~/server/errors'
import { prisma } from '~/server/prisma'

const userCreateBodySchema = z.object({
  realName: z.string({
    required_error: 'realName is required.',
    invalid_type_error: 'realName must be a string.',
  }),
  lineId: z.string({
    required_error: 'lineId is required.',
    invalid_type_error: 'lineId must be a string.',
  }),
  name: z.string({
    required_error: 'name is required.',
    invalid_type_error: 'name must be a string.',
  }),
  avatar: z.string({
    required_error: 'avatar is required.',
    invalid_type_error: 'avatar must be a string.',
  }),
})

type userCreateBody = z.infer<typeof userCreateBodySchema>

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<userCreateBody>(event)

    userCreateBodySchema.parse(body)

    const user = await prisma.user.create({
      data: body,
    })

    await prisma.$disconnect()

    return { ...user }
  } catch (error) {
    await errorHandler(error)
  }
})
