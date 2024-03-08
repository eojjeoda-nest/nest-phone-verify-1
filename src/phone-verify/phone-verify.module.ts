import { Module } from '@nestjs/common';
import { PhoneVerifyService } from './phone-verify.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneVerify } from './entities/phone-verify.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneVerify])],
  providers: [PhoneVerifyService],
  exports: [PhoneVerifyService],
})
export class PhoneVerifyModule {}
