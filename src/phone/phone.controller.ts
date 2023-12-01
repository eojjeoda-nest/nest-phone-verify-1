import {  Controller, Get, Post, Body, Patch, Param, Delete,ValidationPipe } from '@nestjs/common';
import { PhoneService } from './phone.service';

import { PhoneNumberRequestDto } from './dto/phoneNumberRequest.dto';
import { ResultResponseDto } from './dto/resultResponse.dto';
import { CodeRequestDto } from './dto/codeRequest.dto';
import { CodeResponseDto } from './dto/codeResponse.dto';
//import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Post('/createCode') //번호받았을때 db화긴후 인증번호 전송
  createCode(@Body() phoneNumberRequestDto: PhoneNumberRequestDto) {
    return this.phoneService.sendCode(phoneNumberRequestDto);
  }

  @Post('/verifyCode')
  verifyCode(@Body() codeRequestDto: CodeRequestDto) {
    return this.phoneService.verifyCode(codeRequestDto);
  }
}