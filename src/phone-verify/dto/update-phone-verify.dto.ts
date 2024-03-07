import { PartialType } from '@nestjs/swagger';
import { CreatePhoneVerifyDto } from './create-phone-verify.dto';

export class UpdatePhoneVerifyDto extends PartialType(CreatePhoneVerifyDto) {}
