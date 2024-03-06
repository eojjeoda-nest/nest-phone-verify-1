import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class issueCodeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '전화번호', default: '010-1234-5678' })
  phoneNumber: string;
}
