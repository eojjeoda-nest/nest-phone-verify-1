import { IsString } from 'class-validator';

export class VerifyCodeRequestDto {
  @IsString()
  phoneNumber: string;
}
