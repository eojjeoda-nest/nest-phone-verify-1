import { Injectable } from '@nestjs/common';
import { PhoneVerification } from '../entity/PhoneVerification';
import {  VerifyCodeDto } from '../dto/VerifyCodeDto';
import {SendCodeDto} from "../dto/SendCodeDto";
import { CheckCodeDto } from "../../notificaiton/dto/notificaiton-response.dto";

@Injectable()
export class PhoneService {
    private readonly verifications: PhoneVerification[] = [];
    private readonly waitingClients: Map<string, (isValid: boolean) => void> = new Map();
    sendCode(sendCodeDto: SendCodeDto): any {
        const verificationCode = Math.floor(100000 + Math.random() * 900000); // 6자리 랜덤 숫자 생성
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 5); // 현재 시간으로부터 5분 후

        const verification: PhoneVerification = {
            phoneNumber: sendCodeDto.phoneNumber,
            code: verificationCode.toString(),
            timestamp: expirationTime, // 여기를 수정
        };

        this.verifications.push(verification);
        return { code: verificationCode };
    }



    verifyCode(phoneNumber: string, code: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                resolve(false); // 5분 후 false 반환
            }, 300000); // 5분

            this.waitForCodeVerification(phoneNumber, code, resolve, timer);
        });
    }

    private waitForCodeVerification(phoneNumber: string, code: string, resolve: (value: boolean) => void, timer: NodeJS.Timeout) {
        const checkVerification = () => {
            const verification = this.verifications.find(v => v.phoneNumber === phoneNumber && v.code === code);
            if (verification) {
                clearTimeout(timer);
                resolve(true);
            } else {
                setTimeout(checkVerification, 5000); // 5초마다 확인
            }
        };
        checkVerification();
    }

    getAllVerifications(): VerifyCodeDto[] {
        return this.verifications.map(verification => ({
            phoneNumber: verification.phoneNumber,
            code: verification.code
        }));
    }

    startVerification(phoneNumber: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            this.waitingClients.set(phoneNumber, resolve);
        });
    }

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