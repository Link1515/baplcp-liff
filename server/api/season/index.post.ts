import { errorHandler } from '~/server/errors'
import { prisma } from '~/server/prisma'
import { checkAdminStatus } from '~/server/session'
import { seasonPostBodySchema, SeasonPostBodySchema } from '~/server/bodySchema'
import {
  userService,
  seasonService,
  activityRecordService,
  scheduleService,
} from '~/server/services'

export default defineEventHandler(async (event) => {
  try {
    await checkAdminStatus(event)

    if (!process.env.APP_SCRIPT_URL)
      throw new Error('Cannot found app script url')

    const appScriptUrl = process.env.APP_SCRIPT_URL

    const body = await readBody<SeasonPostBodySchema>(event)

    seasonPostBodySchema.parse(body)

    const season = await seasonService.create({ data: body })

    // add schedule to mongo
    await scheduleService.createGroupAlert(season)

    season.activity.forEach(async (activity) => {
      // add schedule to app script
      await $fetch(appScriptUrl, {
        method: 'POST',
        body: {
          triggerDateTime: activity.allowedJoinDate,
        },
      })
      await $fetch(appScriptUrl, {
        method: 'POST',
        body: {
          triggerDateTime: activity.joinDeadline,
        },
      })

      // admin auto join
      const adminUsers = await userService.findAdmins()
      await activityRecordService.createManyByUsers({
        users: adminUsers,
        activityId: activity.id,
      })
    })

    await prisma.$disconnect()

    return {}
  } catch (error) {
    await errorHandler(error)
  }
})
