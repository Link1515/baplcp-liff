import { compareAsc, subDays } from 'date-fns'
import { prisma } from '../prisma'
import { SeasonPostBodySchema } from '../bodySchema'

export const seasonService = {
  create: async (params: { data: SeasonPostBodySchema }) => {
    const { data } = params

    const sortedDates = data.activityDates.sort(compareAsc)

    const season = await prisma.season.create({
      data: {
        name: data.name,
        pricePerActivity: data.pricePerActivity,
        enableSeasonPayment: data.enableSeasonPayment,
        pricePerSeason: data.pricePerSeason,
        startDate: new Date(sortedDates[0]),
        endDate: new Date(sortedDates[sortedDates.length - 1]),
        allowedJoinDate: subDays(new Date(sortedDates[0]), 6),
        activityJoinLimit: data.activityJoinLimit,
        activityStartTime: data.activityStartTime,
        activityEndTime: data.activityEndTime,
        activity: {
          create: sortedDates.map((date) => ({
            date: new Date(date),
            allowedJoinDate: subDays(new Date(date), 5),
            joinDeadline: subDays(new Date(date), 2),
          })),
        },
      },
      include: { activity: true },
    })

    return season
  },
  findById: async (params: { id: string }) => {
    const { id } = params

    const season = await prisma.season.findUnique({
      where: { id },
      include: { activity: true },
    })

    return season
  },
  findMany: async () => {
    const seasonList = await prisma.season.findMany()

    return seasonList
  },
}
