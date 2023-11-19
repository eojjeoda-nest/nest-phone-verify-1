import { Body, Controller, Post } from '@nestjs/common'
import { CertificationsService } from './certifications.service'
import {
    CreateCertificationPhoneDto,
    CertificationPhoneVerifyDto,
} from './dto/certifications.dto'
import { ResponseDto } from 'src/commonDto/common.dto'

@Controller('certifications')
export class CertificationsController {
    constructor(
        private readonly certificationsService: CertificationsService
    ) {}

    @Post('phone')
    create(
        @Body() createCertificationDto: CreateCertificationPhoneDto
    ): ResponseDto<CertificationPhoneVerifyDto> {
        return this.certificationsService.create(createCertificationDto)
    }
}
