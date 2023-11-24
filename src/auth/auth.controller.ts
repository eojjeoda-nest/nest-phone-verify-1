import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestSigninCodeDto } from './dto/request-signin-code.dto';
import { SmsCodeDto } from './dto/sms-code.dto';
import { VerifySinginCodeDto } from './dto/verify-singin-code.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** SMS 인증번호 요청 */
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async requestSigninToken(@Body() body: RequestSigninCodeDto) {
    return this.authService.requestSigninCode(body);
  }

  /** SMS 인증 */
  @Post('signin/:code')
  @HttpCode(HttpStatus.OK)
  async verifySigninToken(
    @Param() param: SmsCodeDto,
    @Body() body: VerifySinginCodeDto,
  ) {
    return await this.authService.verifySigninCode(param, body);
  }
}
