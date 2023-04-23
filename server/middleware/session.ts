import { sessionConfig } from '../sessionConfig'

export default defineEventHandler((event) => {
  useSession(event, sessionConfig)
})
