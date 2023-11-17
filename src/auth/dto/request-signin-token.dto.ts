import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class RequestSigninTokenDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^01[0-9]-[0-9]{3,4}-[0-9]{4}$/, {
    message:
      'phoneNumber must be a valid Korean phone number format (e.g., 010-1234-5678)',
  })
  phoneNumber: string;
}
