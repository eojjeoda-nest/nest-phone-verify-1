import { IsNotEmpty, IsString, Matches } from "class-validator";

export class PhoneNumberRequestDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^010-\d{4}-\d{4}$/, {
    message: 'Invalid phone num',
  }
  )
  phone: string;

}
