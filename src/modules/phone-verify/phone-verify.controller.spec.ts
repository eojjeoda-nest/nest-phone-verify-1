import { Test, TestingModule } from '@nestjs/testing';
import { PhoneVerifyController } from './phone-verify.controller';

describe('PhoneVerifyController', () => {
  let controller: PhoneVerifyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneVerifyController],
    }).compile();

    controller = module.get<PhoneVerifyController>(PhoneVerifyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
