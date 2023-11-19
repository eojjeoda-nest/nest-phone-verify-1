import { ResponseDto } from 'src/commonDto/common.dto'

export function createResponse<T>(message: string, data?: T): ResponseDto<T> {
    return { message, data }
}
