import { IsString, Matches } from 'class-validator';
import { validator } from '../../../../common/validator';

export class PhoneVerifyRequestDto {
  @IsString()
  @Matches(validator.PHONE_NUMBER_REGEX)
  phoneNumber: string;

  @IsString()
  @Matches(validator.VERIFY_CODE_REGEX)
  verifyCode: string;
}
