import { Module } from '@nestjs/common';
import { PhoneVerifyService } from './phone-verify.service';
import { PhoneVerifyController } from './phone-verify.controller';

@Module({
  controllers: [PhoneVerifyController],
  providers: [PhoneVerifyService],
})
export class PhoneVerifyModule {}
