import { prisma } from '../prisma'
import {
  ActivityRecordPatchBodySchema,
  ActivityRecordPostBodySchema,
} from '../bodySchema'
import { User } from '@prisma/client'

export const activityRecordService = {
  create: async (params: { data: ActivityRecordPostBodySchema }) => {
    const { data } = params

    await prisma.joinRecordPerActivity.create({
      data: { ...data, joinedAt: new Date() },
    })
    await prisma.$disconnect()
  },
  createManyByUsers: async (params: { users: User[]; activityId: string }) => {
    const { users, activityId } = params

    await prisma.joinRecordPerActivity.createMany({
      data: users.map((user) => ({
        userId: user.id,
        activityId,
      })),
    })
    await prisma.$disconnect()
  },
  updateActiveAndSetJoinedAt: async (params: { id: string }) => {
    // which will reassign joinedAt field
    const { id } = params

    await prisma.joinRecordPerActivity.update({
      where: { id },
      data: { active: true, joinedAt: new Date() },
    })
    await prisma.$disconnect()
  },
  updateManyById: async (params: {
    ids: string[]
    data: ActivityRecordPatchBodySchema['data']
  }) => {
    const { ids, data } = params

    await prisma.joinRecordPerActivity.updateMany({
      where: { id: { in: ids } },
      data,
    })

    await prisma.$disconnect()
  },
  findManyByActivityId: async (params: { activityId: string }) => {
    const { activityId } = params

    const records = prisma.joinRecordPerActivity.findMany({
      where: { activityId, active: true },
      orderBy: [{ user: { isAdmin: 'desc' } }, { joinedAt: 'asc' }],
      include: { user: true },
    })
    await prisma.$disconnect()

    return records
  },
  findByUserIdActivityId: async (params: {
    userId: string
    activityId: string
  }) => {
    const { userId, activityId } = params

    const record = await prisma.joinRecordPerActivity.findFirst({
      where: { userId, activityId },
    })
    await prisma.$disconnect()

    return record
  },
}
