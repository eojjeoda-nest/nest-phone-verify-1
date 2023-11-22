import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class AuthCodeDto {
  @IsString()
  @IsNotEmpty()
  readonly phoneNumber: string;
  @IsNotEmpty()
  readonly code: string;
}

export class ResponseAuthCodeDto {
  @Expose()
  readonly result: boolean;
}
