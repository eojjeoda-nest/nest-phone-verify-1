import { Body, Controller, Post } from '@nestjs/common'
import { CertificationsService } from './certifications.service'
import { CreateCertificationPhoneDto } from './dto/certifications.dto'

@Controller('certifications')
export class CertificationsController {
    constructor(
        private readonly certificationsService: CertificationsService
    ) {}

    @Post()
    create(@Body() createCertificationDto: CreateCertificationPhoneDto) {
        return this.certificationsService.create(createCertificationDto)
    }
}
