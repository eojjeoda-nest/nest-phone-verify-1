import { Injectable } from '@nestjs/common'
import { createResponse } from 'src/utils/createResponse'
import { CreateCertificationPhoneRequestDto } from './dto/request/create-certification-phone-request.dto'
import { createRandomCertificationCode } from 'src/utils/createRandomCertificationCode'
import { CreateCertificationPhoneResponseDto } from './dto/response/create-certification-phone-response.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { CertificationPhoneEntity } from './entities/certification.entity'
import { Repository } from 'typeorm'
import { ResponseDto } from 'src/common/dto/response.dto'

const EXPIRED_TIME = 3 * 60 * 1000 // 3분

@Injectable()
export class CertificationsService {
  constructor(
    @InjectRepository(CertificationPhoneEntity)
    private certificationPhoneRepository: Repository<CertificationPhoneEntity>
  ) {}

  async create(
    createCertificationPhoneRequest: CreateCertificationPhoneRequestDto
  ): Promise<ResponseDto<CreateCertificationPhoneResponseDto>> {
    const { phoneNumber } = createCertificationPhoneRequest

    const certificationCode = createRandomCertificationCode()

    const certificationPhone = new CertificationPhoneEntity()
    certificationPhone.phoneNumber = phoneNumber
    certificationPhone.certificationCode = certificationCode
    certificationPhone.expiredAt = new Date(Date.now() + EXPIRED_TIME)

    try {
      await this.certificationPhoneRepository.save(certificationPhone)
    } catch (e) {
      console.error(e)
    }

    const data: CreateCertificationPhoneResponseDto = {
      phoneNumber,
      certificationCode,
    }

    return createResponse<CreateCertificationPhoneResponseDto>(
      '인증번호가 성공적으로 발급되었습니다.',
      data
    )
  }
}
