import { Activity, Season } from '@prisma/client'
import { format } from 'date-fns'
import { prisma } from '../prisma'
import { createJoinMessage, createDeadlineMessage } from '../lineMessage'

export const scheduleService = {
  createGroupAlert: async (season: Season & { activity: Activity[] }) => {
    if (!process.env.LIFF_BASE_URL)
      throw new Error('Cannot found liff base url')

    const liffBaseUrl = process.env.LIFF_BASE_URL

    await prisma.schedule.createMany({
      data: [
        ...season.activity.map((activity) => ({
          triggerDateTime: new Date(activity.allowedJoinDate),
          messageJson: createJoinMessage({
            name: season.name,
            date: format(new Date(activity.date), 'yyyy/MM/dd (ccc.)'),
            timeStart: season.activityStartTime,
            timeEnd: season.activityEndTime,
            price: season.pricePerActivity,
            joinLimit: season.activityJoinLimit,
            joinUrl: `${liffBaseUrl}/activity/${activity.id}`,
          }),
        })),

        ...season.activity.map((activity) => ({
          triggerDateTime: new Date(activity.joinDeadline),
          messageJson: createDeadlineMessage({
            name: season.name,
            date: format(new Date(activity.date), 'yyyy/MM/dd (ccc.)'),
            url: `${liffBaseUrl}/activity/${activity.id}`,
          }),
        })),
      ],
    })
  },
}
