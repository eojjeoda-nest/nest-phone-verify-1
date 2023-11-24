import { IsEmail,IsNotEmpty,IsString } from "class-validator";

export class CodeRequestDto {
  @IsString()
  @IsNotEmpty()
  phone: string;
}
