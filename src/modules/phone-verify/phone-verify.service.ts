import { Injectable } from '@nestjs/common';
import { CreateNumberRequestDto } from './dto/create-num-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneVerify } from './entity/phoneVerify';
import { Repository } from 'typeorm';
import { PhoneVerifyMapper } from './mapper/phoneVerify.mapper';

@Injectable()
export class PhoneVerifyService {

    constructor(
        @InjectRepository(PhoneVerify)
        private readonly phoneVerifyRepository: Repository<PhoneVerify>,

        private readonly phoneVerifyMapper: PhoneVerifyMapper
    ){}

// 고려사항) 1. 5분이 지나면 인증번호 만료, 2. 5분전에 같은 전번으로 인증번호 발급받으면 인증번호 갱신 다시 5분으로

    async sendVerifyNumber(createNumberRequestDto: CreateNumberRequestDto): Promise<PhoneVerify> {
        const isPhoneNumExist = await this.phoneVerifyRepository.findOne({where: {phoneNumber: createNumberRequestDto.phoneNumber}});
        
        if(isPhoneNumExist){
            //db에 전번이 있다면 -> 인증번호를 업데이트 (주기는 updateAt 5분만료)
            const updateRandomNumber = this.getRandomNumber();
            const updatePhoneEntity = this.phoneVerifyMapper.updateEntity(isPhoneNumExist, updateRandomNumber);

            return await this.phoneVerifyRepository.save(updatePhoneEntity);


        } else{
            //db에 전번이 없다면 -> 인증번호를 새로 생성 (주기는 createAt 5분만료)
            const newRandomNumber = this.getRandomNumber();
            const newPhoneEntity = this.phoneVerifyMapper.dtoToEntity(createNumberRequestDto, newRandomNumber);

            return await this.phoneVerifyRepository.save(newPhoneEntity);

        }
    }

    

    private getRandomNumber(): string {
        const randomNumber = Math.floor(Math.random() * (999999-100000) + 100000);
        return randomNumber.toString();
    }
}
