import { z } from 'zod'
import { sessionConfig } from '~/server/sessionConfig'
import { compareAsc } from 'date-fns'
import { ErrorWithCode, forbiddenError } from '~/server/errors'
import { prisma } from '~/server/prisma'

const seasonCreateBodySchema = z
  .object({
    name: z
      .string({
        required_error: 'name is required.',
        invalid_type_error: 'name must be a string.',
      })
      .min(1, { message: 'name length must be greater than 1' }),
    pricePerActivity: z.number({
      required_error: 'pricePerActivity is required.',
      invalid_type_error: 'pricePerActivity must be a number.',
    }),
    activityJoinLimit: z
      .number({
        required_error: 'activityJoinLimit is required.',
        invalid_type_error: 'activityJoinLimit must be a string.',
      })
      .gt(1, { message: 'activityJoinLimit must greater than 1' }),
    activityStartTime: z
      .string({
        required_error: 'activityStartTime is required.',
        invalid_type_error: 'activityStartTime must be a string.',
      })
      .regex(/^\d{2}:\d{2}$/, { message: 'Format must be hh:mm' }),
    activityEndTime: z
      .string({
        required_error: 'activityEndTime is required.',
        invalid_type_error: 'activityEndTime must be a string.',
      })
      .regex(/^\d{2}:\d{2}$/, { message: 'Format must be hh:mm' }),
    enableSeasonPayment: z
      .boolean({
        invalid_type_error: 'enableSeasonPayment must be a boolean.',
      })
      .default(false),
    pricePerSeason: z
      .number({
        invalid_type_error: 'pricePerSeason must be a number.',
      })
      .optional(),
    activityDates: z
      .number({ required_error: 'activityDates is required.' })
      .array()
      .nonempty({
        message: 'activityDates at least include one date.',
      }),
  })
  .refine(
    ({ enableSeasonPayment, pricePerSeason }) =>
      enableSeasonPayment ? pricePerSeason !== undefined : true,
    { message: 'You must send pricePerSeason when enableSeasonPayment is true' }
  )

type SeasonCreateBody = z.infer<typeof seasonCreateBodySchema>

export default defineEventHandler(async (event) => {
  try {
    // TODO 記得解註解
    // const session = await getSession(event, sessionConfig)
    // if (!session.data.isAdmin) throw forbiddenError

    const body = await readBody<SeasonCreateBody>(event)

    seasonCreateBodySchema.parse(body)

    const sortedDates = body.activityDates.sort(compareAsc)

    await prisma.season.create({
      data: {
        name: body.name,
        pricePerActivity: body.pricePerActivity,
        enableSeasonPayment: body.enableSeasonPayment,
        pricePerSeason: body.pricePerSeason,
        startDate: new Date(sortedDates[0]),
        endDate: new Date(sortedDates[sortedDates.length - 1]),
        activityJoinLimit: body.activityJoinLimit,
        activityStartTime: body.activityStartTime,
        activityEndTime: body.activityEndTime,
        activity: {
          create: sortedDates.map((date) => ({ date: new Date(date) })),
        },
      },
    })

    await prisma.$disconnect()

    return {}
  } catch (error) {
    await prisma.$disconnect()

    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: error.issues.map((issue) => issue.message).join(' '),
      })
    } else if (error instanceof ErrorWithCode) {
      throw createError({
        statusCode: error.code,
        statusMessage: error.message,
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Server error',
    })
  }
})
