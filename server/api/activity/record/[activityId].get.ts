import { errorHandler } from '~/server/errors'
import { activityRecordService } from '~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const activityId = event.context.params?.activityId as string

    const records = await activityRecordService.findManyByActivityId({
      activityId,
    })

    return records
  } catch (error) {
    await errorHandler(error)
  }
})
