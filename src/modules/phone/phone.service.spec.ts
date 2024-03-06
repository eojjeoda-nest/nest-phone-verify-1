import { Test, TestingModule } from '@nestjs/testing';
import { PhoneService } from './phone.service';
import { Phone } from './entities/phone.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PhoneService', () => {
  let service: PhoneService;
  let mockRepository;

  beforeEach(async () => {
    mockRepository = {
      delete: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhoneService,
        {
          provide: getRepositoryToken(Phone),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PhoneService>(PhoneService);
  });

  it('전화번호를 입력 후 인정번호를 받는다.', async () => {
    const phoneNumber = '01012345678';
    const result = await service.sendCode(phoneNumber);

    expect(mockRepository.delete).toHaveBeenCalledWith({ phoneNumber });
    expect(mockRepository.save).toHaveBeenCalled();
    expect(result.code).toBeDefined();
    expect(result.code).toHaveLength(6);
  });

  it('형식에 맞지 않게 입력하면 400 BadRequest 에러를 반환한다.', async () => {
    mockRepository.findOne.mockResolvedValue(null);

    await expect(service.verifyCode('01012345678', '123456')).rejects.toThrow('인증번호가 일치하지 않습니다.');
  });

  it('인증번호가 만료된 후 인증하려하면 400 BadRequest 에러를 반환한다.', async () => {
    const phoneNumber = '01012345678';
    const code = '123456';
    const oldTimestamp = new Date(Date.now() - 6 * 60000); // 6분 전

    mockRepository.findOne.mockResolvedValue({ phoneNumber, code, timestamp: oldTimestamp });

    await expect(service.verifyCode(phoneNumber, code)).rejects.toThrow('인증번호가 만료되었습니다.');
  });

  it('전화번호 입력 후, 인증에 성공한다.', async () => {
    const phoneNumber = '01012345678';
    const code = '123456';
    const recentTimestamp = new Date();

    mockRepository.findOne.mockResolvedValue({ phoneNumber, code, timestamp: recentTimestamp });

    const result = await service.verifyCode(phoneNumber, code);

    expect(result.result).toBeTruthy();
  });
});
