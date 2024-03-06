import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { SendCodeDto } from './dto/send-code.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('phone')
@ApiTags('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Post('/send-code')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '인증번호 생성 API', description: '인증번호를 생성한다.'})
  @ApiBody({ type: SendCodeDto })
  @ApiResponse({ status: 201, description: '생성 완료', type: SendCodeDto })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async sendCode(@Body() sendCodeDto: SendCodeDto) {
    const { phoneNumber } = sendCodeDto;
    return await this.phoneService.sendCode(phoneNumber);
  }

  @Post('/verify-code')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '인증번호 인증 API', description: '인증번호로 인증한다.'})
  @ApiBody({ type: VerifyCodeDto })
  @ApiResponse({ status: 200, description: '성공', type: VerifyCodeDto })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async verifyCode(@Body() verifyCodeDto: VerifyCodeDto) {
    const { phoneNumber, code } = verifyCodeDto;
    return await this.phoneService.verifyCode(phoneNumber, code);
  }
}