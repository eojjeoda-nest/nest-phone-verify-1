import { IsNotEmpty, IsString } from 'class-validator';

export class issueCodeDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}
