import { IsString } from 'class-validator';

export class PhoneVerifyCodeRequestDto {
  @IsString()
  phoneNumber: string;
}
