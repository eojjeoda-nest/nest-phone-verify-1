import { Module } from '@nestjs/common'
import { CertificationsService } from './certifications.service'
import { CertificationsController } from './certifications.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CertificationPhoneEntity } from './entities/certification.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CertificationPhoneEntity])],
  controllers: [CertificationsController],
  providers: [CertificationsService],
})
export class CertificationsModule {}
