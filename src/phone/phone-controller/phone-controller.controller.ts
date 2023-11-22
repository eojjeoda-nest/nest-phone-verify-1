import { Body, Controller, Post, HttpCode, HttpStatus, Get, Query, Param } from "@nestjs/common";
import { ApiOperation, ApiBody, ApiResponse, ApiQuery, ApiParam, ApiTags } from "@nestjs/swagger";
import { VerifyCodeDto } from '../dto/VerifyCodeDto';
import {PhoneService} from "../phone-service/phone-service.service";
import {SendCodeDto} from "../dto/SendCodeDto";
import { CheckCodeDto } from "../../notificaiton/dto/notificaiton-response.dto";
@ApiTags('Phone')
@Controller('api/v1/Phone')
export class PhoneController {
    constructor(private readonly phoneVerificationService: PhoneService) {}


    @Post('/send-code')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Send Verification Code', description: 'Sends a verification code to the given phone number.' })
    @ApiBody({ type: SendCodeDto })
    @ApiResponse({ status: 200, description: 'Verification code sent', type: String })
    sendCode(@Body() sendCodeDto: SendCodeDto) {
        return this.phoneVerificationService.sendCode(sendCodeDto);
    }

    @Get('/start-verification/:phoneNumber')
    @ApiOperation({ summary: '휴대전화 인증 시작', description: '주어진 휴대전화 번호에 대한 인증 절차를 시작합니다.' })
    @ApiParam({ name: 'phoneNumber', type: String, description: '인증을 시작할 휴대전화 번호' })
    @ApiResponse({ status: 200, description: '인증 절차 시작됨', type: Boolean })
    startVerification(@Param('phoneNumber') phoneNumber: string): Promise<boolean> {
        return this.phoneVerificationService.startVerification(phoneNumber);
    }

    @Post('/check-code')
    @ApiOperation({ summary: '인증 코드 확인', description: '제공된 인증 코드의 유효성을 검증합니다.' })
    @ApiBody({ type: CheckCodeDto }) // CheckCodeDto는 인증 코드만 포함
    @ApiResponse({ status: 200, description: '인증 코드 검증 결과', type: Boolean })
    checkCode(@Body() checkCodeDto: CheckCodeDto): boolean {
        return this.phoneVerificationService.checkCode(checkCodeDto.code);
    }



    @Get('get-all-verifications')
    @ApiOperation({ summary: 'Get all stored phone numbers and verification codes' })
    @ApiResponse({
        status: 200,
        description: 'List of all stored phone numbers and verification codes',
        type: [VerifyCodeDto]
    })
    getAllVerifications(): VerifyCodeDto[] {
        return this.phoneVerificationService.getAllVerifications();
    }
}
