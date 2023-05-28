import { errorHandler } from '~/server/errors'
import { checkAdminStatus } from '~/server/session'
import { seasonPostBodySchema, SeasonPostBodySchema } from '~/server/bodySchema'
import {
  userService,
  seasonService,
  activityRecordService,
  scheduleService,
  appScriptService,
} from '~/server/services'

export default defineEventHandler(async (event) => {
  try {
    await checkAdminStatus(event)

    const body = await readBody<SeasonPostBodySchema>(event)

    seasonPostBodySchema.parse(body)

    const season = await seasonService.create({ data: body })

    // add schedule to mongo
    await scheduleService.createGroupAlert(season)

    const adminUsers = await userService.findAdmins()
    season.activity.forEach(async (activity) => {
      // add schedule to app script
      appScriptService.createGroupMessageCronJobs(activity.allowedJoinDate)
      appScriptService.createGroupMessageCronJobs(activity.joinDeadline)

      // admin auto join
      await activityRecordService.createManyByUsers({
        users: adminUsers,
        activityId: activity.id,
      })
    })

    return {}
  } catch (error) {
    await errorHandler(error)
  }
})
