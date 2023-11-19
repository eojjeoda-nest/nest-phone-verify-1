import { Injectable } from '@nestjs/common'
import { CreateCertificationPhoneDto } from './dto/certifications.dto'
import { createResponse } from 'src/utils/createResponse'

@Injectable()
export class CertificationsService {
    create(createCertificationDto: CreateCertificationPhoneDto) {
        return createResponse(
            '인증번호가 발송되었습니다.',
            createCertificationDto
        )
    }
}
