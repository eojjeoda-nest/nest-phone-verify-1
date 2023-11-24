import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCodeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'phoneNumber' })
  readonly phoneNumber: string;
  @IsNotEmpty()
  @ApiProperty({ description: 'code' })
  readonly code: string;
}

export class ResponseAuthCodeDto {
  @Expose()
  @ApiProperty({ description: 'result' })
  readonly result: boolean;
}
