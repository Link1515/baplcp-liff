import { z } from 'zod'
import {
  ErrorWithCode,
  badRequestError,
  unauthorizedError,
} from '~/server/errors'
import { sessionConfig } from '~/server/sessionConfig'
import { User } from '@prisma/client'
import { prisma } from '~/server/prisma'

const userUpdateBodySchema = z.object({
  name: z.string({ invalid_type_error: 'name must be a string.' }).optional(),
  avatar: z
    .string({ invalid_type_error: 'avatar must be a string.' })
    .optional(),
})

type userUpdateBody = z.infer<typeof userUpdateBodySchema>

// TODO we cannot use http patch method on ngrok. Maybe try patch on production env (cyclic).
export default defineEventHandler(async (event) => {
  try {
    const session = await getSession<{ user: User }>(event, sessionConfig)
    const { user } = session.data

    if (!user) throw unauthorizedError('User unauthorized')

    const body = await readBody<userUpdateBody>(event)

    userUpdateBodySchema.parse(body)

    if (!body.name && !body.avatar)
      throw badRequestError(
        'You should provide name or avatar to update user data'
      )

    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: body.name,
        avatar: body.avatar,
      },
    })

    await prisma.$disconnect()

    return {}
  } catch (error) {
    await prisma.$disconnect()

    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: error.issues.map((issue) => issue.message).join(' '),
      })
    } else if (error instanceof ErrorWithCode) {
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
