export class CertificationPhoneDto {
    phoneNumber: string
}

export class CreateCertificationPhoneDto extends CertificationPhoneDto {}

export class ResponseCertificationPhoneVerifyDto extends CertificationPhoneDto {
    code: string
}
