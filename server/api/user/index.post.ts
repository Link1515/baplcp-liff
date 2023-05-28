import { errorHandler } from '~/server/errors'
import { sessionConfig } from '~/server/session'
import { userPostBodySchema, UserPostBodySchema } from '~/server/bodySchema'
import { userService } from '~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<UserPostBodySchema>(event)

    userPostBodySchema.parse(body)

    const user = await userService.create({ data: body })

    await updateSession(event, sessionConfig, { user })

    return { ...user }
  } catch (error) {
    await errorHandler(error)
  }
})
