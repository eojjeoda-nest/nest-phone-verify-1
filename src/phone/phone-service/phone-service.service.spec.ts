import { Test, TestingModule } from '@nestjs/testing';
import {PhoneService} from './phone-service.service';
import { SendCodeDto } from "../dto/SendCodeDto";
import { TitleNullException } from "../exception/TitleNullException";
import { exhaustiveTypeException } from "tsconfig-paths/lib/try-path";
import { CodeNotFound } from "../exception/CodeNotFound";
import { TimeOver } from "../exception/TimeOver";

describe('PhoneServiceService', () => {
  let service: PhoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      exports: [PhoneService],
      providers: [
        {
          provide: PhoneService,
          useValue: {
            sendCode: jest.fn(),
            getAllVerifications:jest.fn(),
            checkCode:jest.fn(),
          },
        },
      ],
  }).compile();

    service = module.get<PhoneService>(PhoneService);
  });

  it('전화번호가 주어지면, 인증 코드를 생성하고 반환해야 함', async () => {
    const mockSendCodeResult = { code: '123456' };
    jest.spyOn(service, 'sendCode').mockResolvedValue(mockSendCodeResult);

    const mockPhoneNumber = '010-1234-5678';
    const sendCodeDto: SendCodeDto = { phoneNumber: mockPhoneNumber };

    const result = await service.sendCode(sendCodeDto);

    expect(result).toEqual(mockSendCodeResult);
  });


  it('전화번호가 주어지지 않으면, TitleNullException을 발생시켜야 함', async () => {
    const sendCodeDto: SendCodeDto = { phoneNumber: '' };

    jest.spyOn(service, 'sendCode').mockRejectedValue(new TitleNullException());

    await expect(service.sendCode(sendCodeDto)).rejects.toThrow(TitleNullException);
  });


  describe('getAllVerifications',() =>{
    service.sendCode({phoneNumber:'010-1234-1234'});
    service.sendCode({phoneNumber:'010-1234-1111'});

    const result = service.getAllVerifications();
    expect(result).toHaveLength(2);
  });

  describe('checkCode',()=>{
    it('올바른 전화번호와 코드로 인증 성공해야 함',()=>{
      service.sendCode({phoneNumber:'010-1234-1234'});
      expect(()=> service.checkCode('010-1234-1234','wrongcode')).toThrow(CodeNotFound);
    });

    it('코드 유효 시간이 지나면 TimeOver 예외를 발생시켜야 함', () => {
      jest.useFakeTimers();

      const sendCodeDto: SendCodeDto = { phoneNumber: '010-1234-1234' };
      const sentCode = service.sendCode(sendCodeDto); // 변수 이름 수정

      const futureTime = new Date();
      futureTime.setMinutes(futureTime.getMinutes() + 5); // 오타 수정
      jest.setSystemTime(futureTime);

      // 코드 검증 시도
      expect(() => service.checkCode(sendCodeDto.phoneNumber, sentCode.code)).toThrow(TimeOver); // 변수 이름 수정

      jest.useRealTimers(); // 테스트 후 실제 타이머로 다시 설정
    });
  });
});
