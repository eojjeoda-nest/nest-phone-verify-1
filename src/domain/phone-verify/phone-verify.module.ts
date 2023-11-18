import { Module } from '@nestjs/common';
import { PhoneVerifyService } from './phone-verify.service';

@Module({
  providers: [PhoneVerifyService],
})
export class PhoneVerifyModule {}
