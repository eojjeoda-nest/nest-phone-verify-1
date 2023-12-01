import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Phone } from './entities/phone.entity';
import { Repository } from 'typeorm';
import { CodeRequestDto } from './dto/codeRequest.dto'; 
import { PhoneNumberRequestDto } from './dto/phoneNumberRequest.dto';
import { ResultResponseDto } from './dto/resultResponse.dto';
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

    //if 번호 존재하면 code 만 업데이트 하기
    const phoneEntity = new Phone();
    phoneEntity.phone = phoneNumberRequestDto.phone;
    phoneEntity.code = this.createCode();
    phoneEntity.createdAt = new Date().toString();

    this.phoneRepository.save(phoneEntity);
    const codeResponseDto = new CodeResponseDto(phoneEntity.code);
    return codeResponseDto;
  }

  async verifyCode(codeRequestDto: CodeRequestDto): Promise<ResultResponseDto> {
    try {
      const phoneEntity =await this.phoneRepository.findOne({
            where :{code: codeRequestDto.code}});

      if (phoneEntity) {
        const createdAtDate = new Date(phoneEntity.createdAt);
        const now = new Date();

       
        const differenceInMilliseconds = now.getTime() - createdAtDate.getTime();
        const isWithin5Minutes = differenceInMilliseconds <= 5 * 60 * 1000;
        const resultResponseDto = new ResultResponseDto(true);
        return resultResponseDto;
      } else {
        const resultResponseDto = new ResultResponseDto(false);
        return resultResponseDto;
      }
    } catch (error) {
      console.error('Error querying the database:', error);
      const resultResponseDto = new ResultResponseDto(false);
      return resultResponseDto;
    }
  }
}
