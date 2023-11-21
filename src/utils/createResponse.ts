import { ResponseDto, ResponseWithDataDto } from 'src/common/dto/response.dto'

export function createResponseDto(message: string): ResponseDto {
  return { message }
}

export function createResponseWithDataDto<T>(
  message: string,
  data: T
): ResponseWithDataDto<T> {
  return { message, data }
}
