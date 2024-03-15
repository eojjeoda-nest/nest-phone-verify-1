import { Module } from '@nestjs/common';
import { PhoneVerifyController } from './phone-verify.controller';
import { PhoneVerifyService } from './phone-verify.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneVerify } from './entities/phone-verify.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneVerify])],
  controllers: [PhoneVerifyController],
  providers: [PhoneVerifyService],
})
export class PhoneVerifyModule {}
