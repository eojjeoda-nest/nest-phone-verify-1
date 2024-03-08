import { IsString, Matches } from 'class-validator';

export class VerifyCodeRequestDto {
  @IsString()
  @Matches(/^010-\d{4}-\d{4}$/)
  phoneNumber: string;

  @IsString()
  @Matches(/^[0-9]{6}$/)
  code: string;
}
