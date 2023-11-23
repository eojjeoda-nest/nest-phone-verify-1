import { Injectable } from '@nestjs/common';
import { PhoneVerification } from '../entity/PhoneVerification';
import {  VerifyCodeDto } from '../dto/VerifyCodeDto';
import {SendCodeDto} from "../dto/SendCodeDto";
import { TitleNullException } from "../exception/TitleNullException";
import { CodeNotFound } from "../exception/CodeNotFound";
import { TimeOver } from "../exception/TimeOver";

@Injectable()
export class PhoneService {
    private readonly verifications: PhoneVerification[] = [];
    private readonly waitingClients: Map<string, (isValid: boolean) => void> = new Map();

    //인증 코드 생성
    sendCode(sendCodeDto: SendCodeDto): any {

        //만약 전화번호 작성하지 않았으면
        if (!sendCodeDto.phoneNumber) {
            throw new TitleNullException();
        }
        const verificationCode = Math.floor(100000 + Math.random() * 900000); // 6자리 랜덤 숫자 생성

        const verification: PhoneVerification = { //매핑
            phoneNumber: sendCodeDto.phoneNumber,
            code: verificationCode.toString(),
            timestamp: new Date()
        };

        this.verifications.push(verification);
        return { code: verificationCode };
    }

    //모든 전화번호와 코드 확인
    getAllVerifications(): VerifyCodeDto[] {
        return this.verifications.map(verification => ({
            phoneNumber: verification.phoneNumber,
            code: verification.code
        }));
    }


    // 인증 코드 확인
    checkCode(phoneNumber: string, code: string): { success: boolean, message: string } {
        const currentTime = new Date(); // 현재 시간

        for (const verification of this.verifications) {
            if (verification.phoneNumber === phoneNumber && verification.code === code) {
                // 인증번호의 생성 시간과 현재 시간의 차이가 5분 이내인지 확인
                const timeDiff = (currentTime.getTime() - verification.timestamp.getTime()) / 60000; // 분 단위로 변환

                if (timeDiff <= 5) { // 5분 이내이면 유효
                    this.waitingClients.delete(verification.phoneNumber);
                    return { success: true, message: "인증 성공" }; // 인증 성공
                } else {
                    // 5분 초과 시
                    throw new TimeOver();// 코드 유효시간이 지나면 TimeOver 예외 발생
                }
            }
        }
        // 일치하는 코드가 없으면 CodeNotFound 예외 발생
        throw new CodeNotFound();
    }
}