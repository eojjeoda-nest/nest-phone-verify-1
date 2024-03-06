import { Controller, Post, Body, UseFilters, Catch } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { issueCodeDto } from './dto/issue-code.dto';
import { verifyPhoneDto } from './dto/verify-phone.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Post('/issue-code')
  @ApiOperation({
    summary: '인증번호 발급 API',
    description: '제출한 전화번호에 대한 인증번호를 발급합니다.',
  })
  @ApiBody({ type: issueCodeDto })
  @ApiResponse({
    status: 201,
    description: '인증번호가 성공적으로 발급되었습니다.',
  })
  @ApiResponse({
    status: 400,
    description: '전화번호 형식이 올바르지 않습니다.',
  })
  async issueCode(
    @Body() issueCodeDto: issueCodeDto,
  ): Promise<{ code: string }> {
    const { phoneNumber } = issueCodeDto;
    const code = await this.phoneService.issue(phoneNumber);
    return { code };
  }

  @Post('/verify-code')
  @ApiOperation({
    summary: '휴대폰 인증 API',
    description: '휴대폰 인증을 처리합니다.',
  })
  @ApiBody({ type: verifyPhoneDto })
  @ApiResponse({
    status: 201,
    description: '휴대폰 인증이 처리되었습니다.',
  })
  @ApiResponse({
    status: 400,
    description: '제출 형식이 올바르지 않습니다.',
  })
  async verifyNumber(
    @Body() verifyPhoneDto: verifyPhoneDto,
  ): Promise<{ result: boolean }> {
    const { phoneNumber, code } = verifyPhoneDto;
    const result = await this.phoneService.verify(phoneNumber, code);

    return { result };
  }
}
