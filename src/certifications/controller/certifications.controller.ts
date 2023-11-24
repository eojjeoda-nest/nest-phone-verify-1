import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CertificationsService } from '../service/certifications.service';

import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCertificationPhoneRequestDto } from '../dto/request/create-certification-phone-request.dto';
import { CreateCertificationPhoneResponseDto } from '../dto/response/create-certification-phone-response.dto';
import { CheckCertificationCodeRequestDto } from '../dto/request/check-certification_code-request.dto';
import {
  ResponseWithDataJson,
  ResponseWithOutDataJson,
} from 'src/common/utils/createResponse';

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
  @ApiOkResponse({
    description: '인증번호 발급 성공',
    schema: {
      example: {
        statusCode: 201,
        message: ['인증번호가 성공적으로 발급되었습니다.'],
        data: {
          phoneNumber: '01092274072',
          certificationCode: '990209',
        },
        timestamp: '2021-09-06T08:40:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: '인증번호 발급 실패',
    schema: {
      example: {
        statusCode: 400,
        message: ['11자리의 휴대폰 번호를 입력해주세요.'],
        timestamp: '2021-09-06T08:40:00.000Z',
      },
    },
  })
  create(
    @Body()
    createCertificationPhoneRequest: CreateCertificationPhoneRequestDto
  ): Promise<ResponseWithDataJson<CreateCertificationPhoneResponseDto>> {
    return this.certificationsService.create(createCertificationPhoneRequest);
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
  @ApiOkResponse({
    description: '인증번호 확인 성공',
    schema: {
      example: {
        statusCode: 200,
        message: ['인증번호가 성공적으로 확인되었습니다.'],
        data: {
          result: true,
        },
        timestamp: '2023-11-22T18:07:08.092Z',
      },
    },
  })
  check(
    @Body() checkCertificationCodeRequest: CheckCertificationCodeRequestDto
  ): Promise<ResponseWithOutDataJson> {
    return this.certificationsService.check(checkCertificationCodeRequest);
  }
}
