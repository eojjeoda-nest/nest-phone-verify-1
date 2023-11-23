import { IsNumberString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SmsCodeDto {
  @ApiProperty({ description: 'sms code', example: '123456' })
  @Length(6, 6)
  @IsNumberString()
  code: string;
}
