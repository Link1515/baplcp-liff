import { prisma } from '../prisma'
import { UserPostBodySchema, UserPatchBodySchema } from '../bodySchema'

export const userService = {
  create: async (params: { data: UserPostBodySchema }) => {
    const { data } = params
    const user = await prisma.user.create({ data })

    return user
  },
  updateById: async (params: {
    id: string
    data: Omit<UserPatchBodySchema, 'userId'>
  }) => {
    const { id, data } = params

    await prisma.user.updateMany({ where: { id }, data })
  },
  findById: async (params: { id: string }) => {
    const { id } = params

    const user = await prisma.user.findUnique({
      where: { id },
    })

    return user
  },
  findByLineId: async (params: { lineId: string }) => {
    const { lineId } = params

    const user = await prisma.user.findUnique({
      where: { lineId },
    })

    return user
  },
  findAdmins: async () => {
    const adminUsers = await prisma.user.findMany({
      where: { isAdmin: true },
    })

    return adminUsers
  },
  findLineGroupMember: async () => {
    const lineGroupMember = await prisma.user.findMany({
      where: { isLineGroupMember: true },
    })

    return lineGroupMember
  },
}
