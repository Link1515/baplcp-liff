import { prisma } from '../prisma'
import { UserPostBodySchema, UserPatchBodySchema } from '../bodySchema'

export const userService = {
  create: async (params: { data: UserPostBodySchema }) => {
    const { data } = params
    const user = await prisma.user.create({ data })
    await prisma.$disconnect()

    return user
  },
  updateById: async (params: {
    id: string
    data: Omit<UserPatchBodySchema, 'userId'>
  }) => {
    const { id, data } = params

    await prisma.user.updateMany({ where: { id }, data })
    await prisma.$disconnect()
  },
  findById: async (params: { id: string }) => {
    const { id } = params

    const user = await prisma.user.findUnique({
      where: { id },
    })
    await prisma.$disconnect()

    return user
  },
  findByLineId: async (params: { lineId: string }) => {
    const { lineId } = params

    const user = await prisma.user.findUnique({
      where: { lineId },
    })
    await prisma.$disconnect()

    return user
  },
  findAdmins: async () => {
    const adminUsers = await prisma.user.findMany({
      where: { isAdmin: true },
    })
    await prisma.$disconnect()

    return adminUsers
  },
}
