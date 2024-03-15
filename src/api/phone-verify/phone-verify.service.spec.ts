import { Test, TestingModule } from '@nestjs/testing';
import { PhoneVerifyService } from './phone-verify.service';

describe('PhoneVerifyService', () => {
  let service: PhoneVerifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhoneVerifyService],
    }).compile();

    service = module.get<PhoneVerifyService>(PhoneVerifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
