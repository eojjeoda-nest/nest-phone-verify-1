import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { PhoneVerifyService } from './phone-verify.service';
import { CreateNumberRequestDto } from './dto/create-num-request.dto';
import { Response } from 'express';
import { PhoneVerifyMapper } from './mapper/phoneVerify.mapper';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckNumberRequestDto } from './dto/check-num-request.dto';

@ApiTags('phoneVerifies')
@Controller('phoneVerifies')
export class PhoneVerifyController {

    constructor(
        private readonly phoneVerifyService: PhoneVerifyService,
        private readonly phoneVerifyMapper: PhoneVerifyMapper
    ){}

    @ApiOperation({
        summary: '인증번호 요청 API',
        description: '사용자가 본인의 핸드폰 번호를 입력하면 랜덤 6자리 숫자 문자열이 반환된다.'})
    @ApiResponse({
        status: 201,
        description: '랜덤 6자리 숫자 문자열이 생성된다.'
    })
    @Post()
    async sendVerifyNumber(
        @Body() createNumberRequestDto: CreateNumberRequestDto,
        @Res() res: Response
    ): Promise<void>{
        const randomNumber = await this.phoneVerifyService.sendVerifyNumber(createNumberRequestDto);
        const response = this.phoneVerifyMapper.createEntityToDto(randomNumber);
        res.status(HttpStatus.CREATED).json(response);
    }

    @ApiOperation({
        summary: '인증번호 인증 API',
        description: '사용자가 본인의 핸드폰 번호와 인증번호를 입력하면 인증번호가 유효한지 아닌지 확인해준다.'})
    @ApiResponse({
        status: 200,
        description: '인증번호가 유효하다.'
    })
    @ApiResponse({
        status: 422,
        description: '인증번호가 유효하지 않다.'
    })

    @Post('/codeCheck')
    async checkVerifyNumber(
        @Body() checkNumberRequestDto: CheckNumberRequestDto,
        @Res() res: Response
    ): Promise<void>{
        const result = await this.phoneVerifyService.checkVerifyNumber(checkNumberRequestDto);
        const response = this.phoneVerifyMapper.checkEntityToDto(result);
        if(result){
            res.status(HttpStatus.OK).json(response);

        } else{
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(response);
        }
    }
}
