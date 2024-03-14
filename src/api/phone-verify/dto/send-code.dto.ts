import { IsNotEmpty, IsString } from 'class-validator';

export class SendCodeDto {
  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;
}
