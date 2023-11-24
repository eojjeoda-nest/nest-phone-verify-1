import {  Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhoneService } from './phone.service';

@Controller('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Post() //번호받았을때 db화긴후 인증번호 전송
  sendNum() {
    return this.phoneService.findAll();
  }

  @Get(':id') //인즈번호 입력후 db저장 인증번호생서 및 리턴인증
  Authorize(@Param('id') id: string) {
    return this.phoneService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phoneService.remove(+id);
  }
}
