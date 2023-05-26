import { z } from 'zod'
import { errorHandler, badRequestError } from '~/server/errors'
import { prisma } from '~/server/prisma'

const userUpdateBodySchema = z.object({
  userId: z.string({
    invalid_type_error: 'userId must be a string.',
    required_error: 'userId is required.',
  }),
  name: z.string({ invalid_type_error: 'name must be a string.' }).optional(),
  avatar: z
    .string({ invalid_type_error: 'avatar must be a string.' })
    .optional(),
})

type userUpdateBody = z.infer<typeof userUpdateBodySchema>

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<userUpdateBody>(event)

    userUpdateBodySchema.parse(body)

    if (!body.name && !body.avatar)
      throw badRequestError(
        'You should provide name or avatar to update user data'
      )

    await prisma.user.update({
      where: { id: body.userId },
      data: {
        name: body.name,
        avatar: body.avatar,
      },
    })

    await prisma.$disconnect()

    return {}
  } catch (error) {
    await errorHandler(error)
  }
})
