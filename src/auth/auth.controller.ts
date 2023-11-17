import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestSigninTokenDto } from './dto/request-signin-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /** SMS 인증번호 요청 */
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async requestSigninToken(@Body() body: RequestSigninTokenDto) {
    return this.authService.requestSigninToken(body);
  }
}
