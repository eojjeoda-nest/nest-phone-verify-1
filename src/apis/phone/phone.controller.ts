import { Controller, Post, Body, UseFilters, Catch } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { issueCodeDto } from './dto/issue-code.dto';
import { verifyPhoneDto } from './dto/verify-phone.dto';

@Controller('')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Post('/issue-code')
  async issueCode(
    @Body() issueCodeDto: issueCodeDto,
  ): Promise<{ code: string }> {
    const { phoneNumber } = issueCodeDto;
    const code = await this.phoneService.issue(phoneNumber);
    return { code };
  }

  @Post('/verify-code')
  async verifyNumber(
    @Body() verifyPhoneDto: verifyPhoneDto,
  ): Promise<{ result: boolean }> {
    const { phoneNumber, code } = verifyPhoneDto;
    const result = await this.phoneService.verify(phoneNumber, code);

    return { result };
  }
}
