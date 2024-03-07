import { Test, TestingModule } from '@nestjs/testing';
import { PhoneVerifyController } from './phone-verify.controller';
import { PhoneVerifyService } from './phone-verify.service';

describe('PhoneVerifyController', () => {
  let controller: PhoneVerifyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneVerifyController],
      providers: [PhoneVerifyService],
    }).compile();

    controller = module.get<PhoneVerifyController>(PhoneVerifyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
