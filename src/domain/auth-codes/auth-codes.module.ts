import { Module } from '@nestjs/common';
import { AuthCodesService } from './auth-codes.service';
import { AuthCodesController } from './auth-codes.controller';

@Module({
  controllers: [AuthCodesController],
  providers: [AuthCodesService],
})
export class AuthCodesModule {}
