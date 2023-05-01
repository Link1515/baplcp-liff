import { ErrorWithCode } from './class/ErrorWithCode'

export const notFoundError = (message: string) =>
  new ErrorWithCode('NOT_FOUND', message, 404)
