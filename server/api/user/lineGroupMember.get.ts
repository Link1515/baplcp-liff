import { errorHandler } from '~/server/errors'
import { userService } from '~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const lineGroupMember = await userService.findLineGroupMember()

    return lineGroupMember
  } catch (error) {
    await errorHandler(error)
  }
})
