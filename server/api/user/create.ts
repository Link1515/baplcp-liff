import { PrismaClient } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
  try {
    await prisma.$connect()

    // await prisma.user.create({
    //   data: {
    //     name: 'Link',
    //     lineId: '123123',
    //   },
    // })

    await prisma.$disconnect()

    // const users = await prisma.user.findMany()
    // console.log(users)
    return {
      success: true,
      // users,
    }
  } catch (e) {
    console.log(e)
    return {
      success: false,
    }
  }
})
