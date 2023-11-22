import { Injectable } from '@nestjs/common';
import { PhoneVerification } from '../entity/PhoneVerification';
import {  VerifyCodeDto } from '../dto/VerifyCodeDto';
import {SendCodeDto} from "../dto/SendCodeDto";
import { TitleNullException } from "../exception/TitleNullException";

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

    //휴대전화 인증 시작
    startVerification(phoneNumber: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const timer = setTimeout(() => {
                this.waitingClients.delete(phoneNumber);
                reject(new Error('Verification timed out')); // 5분 후 타임아웃 에러 반환
            }, 300000); // 5분

            this.waitingClients.set(phoneNumber, (isValid) => {
                clearTimeout(timer);
                resolve(isValid);
            });
        });
    }


    //인증 코드 확인
    checkCode(code: string): boolean {
        let isValid = false;
        this.verifications.forEach((verification) => {
            if (verification.code === code) {
                const resolve = this.waitingClients.get(verification.phoneNumber);
                if (resolve) {
                    resolve(true); // 인증 코드가 유효하면 true로 Long Polling 완료
                    isValid = true;
                }
                this.waitingClients.delete(verification.phoneNumber);
            }
        });
        return isValid; // 코드 검증 결과 반환
    }
}