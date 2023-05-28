import { errorHandler, badRequestError } from '~/server/errors'
import { userPatchBodySchema, UserPatchBodySchema } from '~/server/bodySchema'
import { userService } from '~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<UserPatchBodySchema>(event)

    userPatchBodySchema.parse(body)

    if (!body.name && !body.avatar)
      throw badRequestError(
        'You should provide name or avatar to update user data'
      )

    await userService.updateById({
      id: body.userId,
      data: { name: body.name, avatar: body.avatar },
    })

    return {}
  } catch (error) {
    await errorHandler(error)
  }
})
