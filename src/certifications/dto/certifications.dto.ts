export class CertificationPhoneDto {
    phoneNumber: string
}

export class CreateCertificationPhoneDto extends CertificationPhoneDto {}

export class CertificationPhoneVerifyDto extends CertificationPhoneDto {
    code: string
}
