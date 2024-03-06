import { IsNotEmpty, IsString } from 'class-validator';

export class verifyPhoneDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
