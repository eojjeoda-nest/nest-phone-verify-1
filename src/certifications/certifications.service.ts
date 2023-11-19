import { Injectable } from '@nestjs/common'
import {
    CreateCertificationPhoneDto,
    CertificationPhoneVerifyDto,
} from './dto/certifications.dto'
import { createResponse } from 'src/utils/createResponse'

@Injectable()
export class CertificationsService {
    create(createCertificationDto: CreateCertificationPhoneDto) {
        // 인증번호를 발송하는 로직이 들어갈 예정
        // 인증번호는 6자리의 숫자로 구성된 문자열

        const code = '123456'

        const { phoneNumber } = createCertificationDto

        const res: CertificationPhoneVerifyDto = {
            code,
            phoneNumber,
        }

        return createResponse<CertificationPhoneVerifyDto>(
            '인증번호가 발송되었습니다.',
            res
        )
    }
}
