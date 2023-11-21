import { ResponseDto } from 'src/common/dto/response.dto'

export function createResponse<T>(message: string, data?: T): ResponseDto<T> {
  return { message, data }
}
