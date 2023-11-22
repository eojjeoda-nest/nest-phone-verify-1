import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty({
    description: '응답 상태 코드',
  })
  statusCode: number;
  @ApiProperty({
    description: '응답 메세지',
  })
  message: string;
  @ApiProperty({
    description: '응답 시간',
  })
  timestamp: Date;
}

export class ResponseWithDataDto<T> extends ResponseDto {
  @ApiProperty({
    description: '응답 데이터',
  })
  data: T;
}
