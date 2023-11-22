import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly phoneNumber: string;
}

export class ResponseUserDto {
  @Expose()
  @MinLength(6)
  code: string;
}
