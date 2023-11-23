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

    @Post('/check-code/:phoneNumber')
    @ApiOperation({ summary: '인증 코드 확인', description: '제공된 전화번호에 대한 인증 코드의 유효성을 검증합니다.' })
    @ApiBody({ type: CheckCodeDto })
    @ApiParam({ name: 'phoneNumber', required: true, type: String, description: '전화번호' })
    @ApiResponse({ status: 200, description: '인증 코드 검증 결과', type: Boolean })
    checkCode(@Param('phoneNumber') phoneNumber: string, @Body() checkCodeDto: CheckCodeDto): { success: boolean, message: string } {
        return this.phoneVerificationService.checkCode(phoneNumber, checkCodeDto.code);
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
