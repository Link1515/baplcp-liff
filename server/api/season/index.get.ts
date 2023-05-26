import { prisma } from '~/server/prisma'
import { sessionConfig } from '~/server/session'
import { errorHandler } from '~/server/errors'

export default defineEventHandler(async (event) => {
  try {
    const seasonList = await prisma.season.findMany()
    const session = await getSession(event, sessionConfig)
    console.log(session)
    await prisma.$disconnect()

    return seasonList
  } catch (error) {
    await errorHandler(error)
  }
})
