import { Matches, IsString } from 'class-validator';

export class SendCodeRequestDto {
  @IsString()
  @Matches(/^010-\d{4}-\d{4}$/)
  phoneNumber: string;
}
