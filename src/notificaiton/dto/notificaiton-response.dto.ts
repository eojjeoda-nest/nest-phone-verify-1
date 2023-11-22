import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class CheckCodeDto {
  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  @ApiProperty({ example: '123456', description: 'Verification code' })
  code: string;
}
