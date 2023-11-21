import { Injectable } from '@nestjs/common'
import { createResponseWithDataDto } from 'src/utils/createResponse'
import { CreateCertificationPhoneRequestDto } from './dto/request/create-certification-phone-request.dto'
import { createRandomCertificationCode } from 'src/utils/createRandomCertificationCode'
import { CreateCertificationPhoneResponseDto } from './dto/response/create-certification-phone-response.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { CertificationPhoneEntity } from './entities/certification.entity'
import { Repository } from 'typeorm'
import { ResponseWithDataDto } from 'src/common/dto/response.dto'
import { CheckCertificationCodeRequestDto } from './dto/request/check-certification_code-request.dto'
import {
  CHECK_CERTIFICATION_CODE_STATUS,
  CheckCertificationCodeResponseDto,
} from './dto/response/check-certification_code-response.dto'

const EXPIRED_TIME = 3 * 60 * 1000 // 3분

@Injectable()
export class CertificationsService {
  constructor(
    @InjectRepository(CertificationPhoneEntity)
    private certificationPhoneRepository: Repository<CertificationPhoneEntity>
  ) {}

  async create(
    createCertificationPhoneRequest: CreateCertificationPhoneRequestDto
  ): Promise<ResponseWithDataDto<CreateCertificationPhoneResponseDto>> {
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

    return createResponseWithDataDto<CreateCertificationPhoneResponseDto>(
      '인증번호가 성공적으로 발급되었습니다.',
      data
    )
  }

  async check(
    checkCertificationCodeRequest: CheckCertificationCodeRequestDto
  ): Promise<ResponseWithDataDto<CheckCertificationCodeResponseDto>> {
    const { phoneNumber, certificationCode } = checkCertificationCodeRequest

    const certificationPhone = await this.certificationPhoneRepository.findOne({
      where: {
        phoneNumber,
      },
      order: {
        createdAt: 'DESC',
      },
    })

    if (!certificationPhone) {
      return createResponseWithDataDto<CheckCertificationCodeResponseDto>(
        '인증번호가 존재하지 않습니다.',
        {
          certificationCodeStatus: CHECK_CERTIFICATION_CODE_STATUS.NOT_FOUND,
        }
      )
    }
    if (certificationPhone.expiredAt < new Date()) {
      return createResponseWithDataDto<CheckCertificationCodeResponseDto>(
        '인증번호가 만료되었습니다.',
        {
          certificationCodeStatus: CHECK_CERTIFICATION_CODE_STATUS.EXPIRED,
        }
      )
    }
    if (certificationPhone.certificationCode !== certificationCode) {
      return createResponseWithDataDto<CheckCertificationCodeResponseDto>(
        '인증번호가 일치하지 않습니다.',
        {
          certificationCodeStatus: CHECK_CERTIFICATION_CODE_STATUS.INVALID,
        }
      )
    }
    if (certificationPhone.isVerified) {
      return createResponseWithDataDto<CheckCertificationCodeResponseDto>(
        '이미 인증이 완료된 휴대폰 번호입니다.',
        {
          certificationCodeStatus:
            CHECK_CERTIFICATION_CODE_STATUS.ALREADY_VERIFIED,
        }
      )
    }

    certificationPhone.isVerified = true
    await this.certificationPhoneRepository.save(certificationPhone)

    return createResponseWithDataDto<CheckCertificationCodeResponseDto>(
      '인증번호가 성공적으로 확인되었습니다.',
      {
        certificationCodeStatus: CHECK_CERTIFICATION_CODE_STATUS.SUCCESS,
      }
    )
  }
}
