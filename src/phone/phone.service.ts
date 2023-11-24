import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Phone } from './entities/phone.entity';
import { Repository } from 'typeorm';
//import { CodeRequestDto } from './dto/codeRequest.dto'; 
import { PhoneNumberRequestDto } from './dto/phoneNumberRequest.dto';
// import { ResultResponseDto } from './dto/resultResponse.dto';
import { CodeResponseDto } from './dto/codeResponse.dto';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(Phone)
    readonly phoneRepository: Repository<Phone>,
){}

  createCode() {
    return String(Math.floor(Math.random()*1000000)).padStart(6, "0");

  }

  sendCode(phoneNumberRequestDto: PhoneNumberRequestDto): CodeResponseDto {
    const phoneEntity = new Phone();
    phoneEntity.phone = phoneNumberRequestDto.phone;
    phoneEntity.code = this.createCode();
    phoneEntity.createdAt = new Date().toString();

    this.phoneRepository.save(phoneEntity);
    const codeResponseDto = new CodeResponseDto(phoneEntity.code);
    return codeResponseDto;

}
}