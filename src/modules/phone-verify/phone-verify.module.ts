import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneVerify } from './entity/phoneVerify';
import { PhoneVerifyService } from './phone-verify.service';
import { PhoneVerifyController } from './phone-verify.controller';
import { PhoneVerifyMapper } from './mapper/phoneVerify.mapper';

@Module({
    imports:[TypeOrmModule.forFeature([PhoneVerify])],
    providers:[PhoneVerifyService, PhoneVerifyMapper],
    controllers:[PhoneVerifyController]
})
export class PhoneVerifyModule {}
