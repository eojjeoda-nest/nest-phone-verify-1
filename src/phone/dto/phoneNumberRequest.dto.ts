import { IsEmail,IsNotEmpty,IsString } from "class-validator";

export class PhoneNumberRequestDto {
  @IsString()
  @IsNotEmpty()
  phone: string;
}
