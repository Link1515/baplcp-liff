import { errorHandler, badRequestError } from '~/server/errors'
import { prisma } from '~/server/prisma'
import { userPatchBodySchema, UserPatchBodySchema } from '~/server/bodySchema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<UserPatchBodySchema>(event)

    userPatchBodySchema.parse(body)

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
