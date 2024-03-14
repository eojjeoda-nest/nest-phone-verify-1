import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PhoneVerifyDto {
  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsNumber()
  readonly code: string;
}
