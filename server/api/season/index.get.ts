import { prisma } from '~/server/prisma'
import { errorHandler } from '~/server/errors'

export default defineEventHandler(async (event) => {
  try {
    const seasonList = await prisma.season.findMany()
    await prisma.$disconnect()

    return seasonList
  } catch (error) {
    await errorHandler(error)
  }
})
