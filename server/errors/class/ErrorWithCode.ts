export class ErrorWithCode extends Error {
  name = ''
  message = ''
  code = -1

  constructor(name: string, message: string, code: number) {
    super()

    this.name = name
    this.message = message
    this.code = code
  }
}
