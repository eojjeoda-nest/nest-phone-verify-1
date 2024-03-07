import { Injectable } from '@nestjs/common';
import { CreatePhoneVerifyDto } from './dto/create-phone-verify.dto';
import { UpdatePhoneVerifyDto } from './dto/update-phone-verify.dto';

@Injectable()
export class PhoneVerifyService {
  create(createPhoneVerifyDto: CreatePhoneVerifyDto) {
    return 'This action adds a new phoneVerify';
  }

  findAll() {
    return `This action returns all phoneVerify`;
  }

  findOne(id: number) {
    return `This action returns a #${id} phoneVerify`;
  }

  update(id: number, updatePhoneVerifyDto: UpdatePhoneVerifyDto) {
    return `This action updates a #${id} phoneVerify`;
  }

  remove(id: number) {
    return `This action removes a #${id} phoneVerify`;
  }
}
