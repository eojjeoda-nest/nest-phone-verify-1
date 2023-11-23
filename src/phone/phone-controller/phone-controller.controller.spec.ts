import { Test, TestingModule } from '@nestjs/testing';
import { PhoneController } from './phone-controller.controller';
import { PhoneService } from '../phone-service/phone-service.service';
import { SendCodeDto } from '../dto/SendCodeDto';
import { CheckCodeDto } from '../../notificaiton/dto/notificaiton-response.dto';

describe('PhoneController', () => {
  let controller: PhoneController;
  let mockPhoneService: PhoneService;

  beforeEach(async () => {
    mockPhoneService = {
      sendCode: jest.fn(),
      checkCode: jest.fn(),
      getAllVerifications: jest.fn()
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneController],
      providers: [{ provide: PhoneService, useValue: mockPhoneService }],
    }).compile();

    controller = module.get<PhoneController>(PhoneController);
  });

  describe('sendCode', () => {
    it('PhoneService의 sendCode 메서드를 호출해야 함', async () => {
      const sendCodeDto: SendCodeDto = { phoneNumber: '010-1234-5678' };
      await controller.sendCode(sendCodeDto);
      expect(mockPhoneService.sendCode).toHaveBeenCalledWith(sendCodeDto);
    });
  });

  describe('checkCode', () => {
    it('정확한 매개변수와 함께 PhoneService의 checkCode 메서드를 호출해야 함', async () => {
      const phoneNumber = '010-1234-5678';
      const checkCodeDto: CheckCodeDto = { code: '123456' };
      await controller.checkCode(phoneNumber, checkCodeDto);
      expect(mockPhoneService.checkCode).toHaveBeenCalledWith(phoneNumber, checkCodeDto.code);
    });
  });

  describe('getAllVerifications', () => {
    it('PhoneService의 getAllVerifications 메서드를 호출해야 함', async () => {
      await controller.getAllVerifications();
      expect(mockPhoneService.getAllVerifications).toHaveBeenCalled();
    });
  });
});
