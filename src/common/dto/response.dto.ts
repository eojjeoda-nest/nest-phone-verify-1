import { ApiProperty } from '@nestjs/swagger'

export class ResponseDto {
  @ApiProperty({
    description: '응답 메세지',
  })
  message: string
}

export class ResponseWithDataDto<T> extends ResponseDto {
  @ApiProperty({
    description: '응답 데이터',
  })
  data: T
}
