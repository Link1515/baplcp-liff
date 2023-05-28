import { errorHandler, notFoundError } from '~/server/errors'
import { sessionConfig } from '~/server/session'
import { prisma } from '~/server/prisma'
import { userService } from '~/server/services'

export default defineEventHandler(async (event) => {
  const lineId = event.context.params?.lineId as string

  try {
    const user = await userService.findByLineId({ lineId })

    if (!user) {
      throw notFoundError('User not found')
    }

    await updateSession(event, sessionConfig, { user })

    return user
  } catch (error) {
    await errorHandler(error)
  }
})
