import { IsNotEmpty, IsString } from 'class-validator';

export class PhoneVerifyDto {
  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  readonly code: string;
}
