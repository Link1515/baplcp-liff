import { forbiddenError } from '../errors'
import { sessionConfig } from './config'

export const checkAdminStatus = async (
  event: Parameters<typeof getSession>[0]
) => {
  const session = await getSession(event, sessionConfig)
  if (!session.data.isAdmin) throw forbiddenError
}
