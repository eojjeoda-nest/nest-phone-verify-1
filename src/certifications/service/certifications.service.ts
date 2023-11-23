import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ResponseWithDataJson,
  createResponseWithDataJson,
} from 'src/common/utils/createResponse';
import { CreateCertificationPhoneRequestDto } from '../dto/request/create-certification-phone-request.dto';
import { createRandomCertificationCode } from 'src/certifications/utils/createRandomCertificationCode';
import { CreateCertificationPhoneResponseDto } from '../dto/response/create-certification-phone-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CertificationPhoneEntity } from '../entities/certification.entity';
import { Repository } from 'typeorm';
import { CheckCertificationCodeRequestDto } from '../dto/request/check-certification_code-request.dto';
import { CheckCertificationCodeResponseDto } from '../dto/response/check-certification_code-response.dto';

const EXPIRED_TIME = 3 * 60 * 1000; // 3분

@Injectable()
export class CertificationsService {
  constructor(
    @InjectRepository(CertificationPhoneEntity)
    private certificationPhoneRepository: Repository<CertificationPhoneEntity>
  ) {}

  async create(
    createCertificationPhoneRequest: CreateCertificationPhoneRequestDto
  ): Promise<ResponseWithDataJson<CreateCertificationPhoneResponseDto>> {
    const { phoneNumber } = createCertificationPhoneRequest;

    const certificationCode = createRandomCertificationCode();

    const certificationPhone = new CertificationPhoneEntity();
    certificationPhone.phoneNumber = phoneNumber;
    certificationPhone.certificationCode = certificationCode;
    certificationPhone.expireAt = new Date(Date.now() + EXPIRED_TIME);

    try {
      // 이미 존재하는 핸드폰 번호이면 soft delete 를 한다.
      const existCertificationPhone =
        await this.certificationPhoneRepository.findOne({
          where: {
            phoneNumber,
          },
        });

      if (existCertificationPhone) {
        await this.certificationPhoneRepository.softDelete(
          existCertificationPhone.id
        );
      }

      await this.certificationPhoneRepository.save(certificationPhone);
    } catch (e) {
      throw new BadRequestException('인증번호 발급에 실패하였습니다.');
    }

    const data: CreateCertificationPhoneResponseDto = {
      phoneNumber,
      certificationCode,
    };

    return createResponseWithDataJson<CreateCertificationPhoneResponseDto>(
      '인증번호가 성공적으로 발급되었습니다.',
      data
    );
  }

  async check(
    checkCertificationCodeRequest: CheckCertificationCodeRequestDto
  ): Promise<ResponseWithDataJson<CheckCertificationCodeResponseDto>> {
    const { phoneNumber, certificationCode } = checkCertificationCodeRequest;

    const certificationPhone = await this.certificationPhoneRepository.findOne({
      where: {
        phoneNumber,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (!certificationPhone) {
      throw new NotFoundException('핸드폰 번호가 존재하지 않습니다.');
    } else if (certificationPhone.expireAt < new Date()) {
      throw new BadRequestException('인증번호가 만료되었습니다.');
    } else if (certificationPhone.certificationCode !== certificationCode) {
      throw new BadRequestException('인증번호가 일치하지 않습니다.');
    } else if (certificationPhone.isVerified) {
      throw new BadRequestException('이미 인증이 완료된 휴대폰 번호입니다.');
    }

    certificationPhone.isVerified = true;
    await this.certificationPhoneRepository.save(certificationPhone);

    const data: CheckCertificationCodeResponseDto = {
      result: true,
    };

    return createResponseWithDataJson<CheckCertificationCodeResponseDto>(
      '인증번호가 성공적으로 확인되었습니다.',
      data
    );
  }
}
