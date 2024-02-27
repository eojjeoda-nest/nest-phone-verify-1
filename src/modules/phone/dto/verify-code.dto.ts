import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class VerifyCodeDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^010-\d{4}-\d{4}$/, {
    message: '휴대전화 번호는 반드시 형식에 맞게 작성해야합니다.',
  })
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 6, {
    message: '코드는 여섯자리입니다.'
  })
  code: string;
}