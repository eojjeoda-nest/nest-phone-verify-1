import { Module } from '@nestjs/common';
import { CertificationsService } from '../service/certifications.service';
import { CertificationsController } from '../controller/certifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificationPhoneEntity } from '../entities/certification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CertificationPhoneEntity])],
  controllers: [CertificationsController],
  providers: [CertificationsService],
})
export class CertificationsModule {}
