import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'phoneNumber' })
  readonly phoneNumber: string;
}

export class ResponseUserDto {
  @Expose()
  @MinLength(6)
  @ApiProperty({ description: 'code' })
  code: string;
}
