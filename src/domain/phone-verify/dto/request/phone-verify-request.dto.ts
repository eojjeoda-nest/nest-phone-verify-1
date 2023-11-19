import { IsString } from 'class-validator';

export class PhoneVerifyRequestDto {
  @IsString()
  phoneNumber: string;

  @IsString()
  verifyCode: string;
}
