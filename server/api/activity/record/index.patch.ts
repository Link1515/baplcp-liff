import { errorHandler } from '~/server/errors'
import { checkAdminStatus } from '~/server/session'
import {
  activityRecordPatchBodySchema,
  ActivityRecordPatchBodySchema,
} from '~/server/bodySchema'
import { activityRecordService } from '~/server/services'

export default defineEventHandler(async (event) => {
  try {
    await checkAdminStatus(event)

    const body = await readBody<ActivityRecordPatchBodySchema>(event)

    activityRecordPatchBodySchema.parse(body)

    await activityRecordService.updateManyById({
      ids: body.recordIds,
      data: body.data,
    })

    return {}
  } catch (error) {
    await errorHandler(error)
  }
})
