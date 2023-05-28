import { format } from 'date-fns'
import { errorHandler } from '~/server/errors'
import { prisma } from '~/server/prisma'
import { checkAdminStatus } from '~/server/session'
import { seasonPostBodySchema, SeasonPostBodySchema } from '~/server/bodySchema'
import {
  userService,
  seasonService,
  activityRecordService,
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
    await prisma.schedule.createMany({
      data: [
        ...season.activity.map((activity) => ({
          triggerDateTime: new Date(activity.allowedJoinDate),
          message:
            `${season.name} 開放報名！\n\n` +
            `日期：${format(new Date(activity.date), 'yyyy/MM/dd (ccc.)')}\n` +
            `時間：${season.activityStartTime} ~ ${season.activityEndTime}\n` +
            `費用：${season.pricePerActivity}\n` +
            `人數：${season.activityJoinLimit}\n\n` +
            '歡迎點此連結進入報名\n' +
            `https://liff.line.me/1657098399-wQyYzOee/activity/${activity.id}`,
        })),
        ...season.activity.map((activity) => ({
          triggerDateTime: new Date(activity.joinDeadline),
          message:
            `${season.name} 截止報名！\n\n` +
            `立即查看本次名單：\nhttps://liff.line.me/1657098399-wQyYzOee/activity/${activity.id}`,
        })),
      ],
    })

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
