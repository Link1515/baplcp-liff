import { ErrorWithCode } from './class/ErrorWithCode'

export const badRequestError = (message: string) =>
  new ErrorWithCode('BAD_REQUEST', message, 400)
