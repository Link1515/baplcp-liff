import { prisma } from '../prisma'

export const activityService = {
  findById: async (params: { id: string }) => {
    const { id } = params

    const activity = await prisma.activity.findUnique({
      where: { id },
      include: { season: true },
    })

    return activity
  },
}
