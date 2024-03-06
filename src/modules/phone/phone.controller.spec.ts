import { Test, TestingModule } from '@nestjs/testing';
import { PhoneController } from './phone.controller';
import { PhoneService } from './phone.service';

describe('PhoneController', () => {
  let controller: PhoneController;
  let mockPhoneService: Partial<PhoneService>;

  beforeEach(async () => {
    mockPhoneService = {
      sendCode: jest.fn((phoneNumber) => Promise.resolve({ code: '123456' })),
      verifyCode: jest.fn((phoneNumber, code) => Promise.resolve({ result: true })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneController],
      providers: [{ provide: PhoneService, useValue: mockPhoneService }],
    }).compile();

    controller = module.get<PhoneController>(PhoneController);
  });

  it('전화번호를 입력 후 인정번호를 받는다.', async () => {
    const sendCodeDto = { phoneNumber: '01012345678' };
    const result = await controller.sendCode(sendCodeDto);
    expect(mockPhoneService.sendCode).toHaveBeenCalledWith(sendCodeDto.phoneNumber);
    expect(result).toEqual({ code: '123456' });
  });

  it('전화번호와 인증번호 입력 후, 인증에 성공한다.', async () => {
    const verifyCodeDto = { phoneNumber: '01012345678', code: '123456' };
    const result = await controller.verifyCode(verifyCodeDto);
    expect(mockPhoneService.verifyCode).toHaveBeenCalledWith(verifyCodeDto.phoneNumber, verifyCodeDto.code);
    expect(result).toEqual({ result: true });
  });
});
