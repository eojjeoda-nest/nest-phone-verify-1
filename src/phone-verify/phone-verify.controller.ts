import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PhoneVerifyService } from './phone-verify.service';
import { CreatePhoneVerifyDto } from './dto/create-phone-verify.dto';
import { UpdatePhoneVerifyDto } from './dto/update-phone-verify.dto';

@Controller('phone-verify')
export class PhoneVerifyController {
  constructor(private readonly phoneVerifyService: PhoneVerifyService) {}

  @Post()
  create(@Body() createPhoneVerifyDto: CreatePhoneVerifyDto) {
    return this.phoneVerifyService.create(createPhoneVerifyDto);
  }

  @Get()
  findAll() {
    return this.phoneVerifyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phoneVerifyService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePhoneVerifyDto: UpdatePhoneVerifyDto,
  ) {
    return this.phoneVerifyService.update(+id, updatePhoneVerifyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phoneVerifyService.remove(+id);
  }
}
