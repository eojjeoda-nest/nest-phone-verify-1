import { Body, Controller, Patch, Post } from '@nestjs/common'
import { CertificationsService } from './certifications.service'

import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { CreateCertificationPhoneRequestDto } from './dto/request/create-certification-phone-request.dto'
import { CreateCertificationPhoneResponseDto } from './dto/response/create-certification-phone-response.dto'
import { ResponseWithDataDto } from 'src/common/dto/response.dto'
import { CheckCertificationCodeRequestDto } from './dto/request/check-certification_code-request.dto'
import { CheckCertificationCodeResponseDto } from './dto/response/check-certification_code-response.dto'

@Controller('api/v1/certifications')
@ApiTags('phone-certifications')
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}

  @Post('phone')
  @ApiOperation({
    summary: '휴대폰 인증 번호 발급',
    description: '휴대폰 번호를 입력하면 인증번호를 받는다.',
  })
  @ApiBody({
    description: '휴대폰 번호',
    schema: {
      example: {
        phoneNumber: '01092274072',
      },
    },
  })
  @ApiCreatedResponse({
    description: '인증번호 발급 성공',
    schema: {
      example: {
        message: '인증번호가 성공적으로 발급되었습니다.',
        data: {
          phoneNumber: '01092274072',
          certificationCode: '990209',
        },
      },
    },
  })
  create(
    @Body()
    createCertificationPhoneRequest: CreateCertificationPhoneRequestDto
  ): Promise<ResponseWithDataDto<CreateCertificationPhoneResponseDto>> {
    return this.certificationsService.create(createCertificationPhoneRequest)
  }

  @Patch('phone')
  @ApiOperation({
    summary: '휴대폰 인증 확인',
    description: '휴대폰 인증번호가 맞는지 확인한다.',
  })
  @ApiBody({
    description: '휴대폰 번호',
    schema: {
      example: {
        phoneNumber: '01092274072',
        certificationCode: '990209',
      },
    },
  })
  @ApiCreatedResponse({
    description: '인증번호 확인 성공',
    schema: {
      example: {
        message: '인증번호가 성공적으로 확인되었습니다.',
        data: {
          status: 'SUCCESS',
        },
      },
    },
  })
  check(
    @Body() checkCertificationCodeRequest: CheckCertificationCodeRequestDto
  ): Promise<ResponseWithDataDto<CheckCertificationCodeResponseDto>> {
    return this.certificationsService.check(checkCertificationCodeRequest)
  }
}
