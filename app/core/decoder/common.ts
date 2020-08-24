// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import BufferLayout from "buffer-layout"

export const publicKey = (property: string = "publicKey"): Object => {
  return BufferLayout.blob(32, property)
}

export class DecoderError extends Error {
  public cause?: Error

  constructor(message: string, cause?: Error) {
    super(message)
    this.cause = cause
  }
}
