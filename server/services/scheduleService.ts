import { Activity, Season } from '@prisma/client'
import { format } from 'date-fns'
import { prisma } from '../prisma'

export const scheduleService = {
  createGroupAlert: async (season: Season & { activity: Activity[] }) => {
    if (!process.env.LIFF_BASE_URL)
      throw new Error('Cannot found liff base url')

    const liffBaseUrl = process.env.LIFF_BASE_URL

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
            `${liffBaseUrl}/activity/${activity.id}`,
        })),
        ...season.activity.map((activity) => ({
          triggerDateTime: new Date(activity.joinDeadline),
          message:
            `${season.name} 截止報名！\n\n` +
            '立即查看本次名單：\n' +
            `${liffBaseUrl}/activity/${activity.id}`,
        })),
      ],
    })
    await prisma.$disconnect()
  },
}
