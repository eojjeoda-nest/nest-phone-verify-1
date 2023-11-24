import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, ResponseUserDto } from './dto/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthCode } from './entities/auth-code.entity';
import { plainToInstance } from 'class-transformer';
import { AuthCodeDto, ResponseAuthCodeDto } from './dto/auth-codes.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(AuthCode)
    private authCodeRepository: Repository<AuthCode>,
  ) {}

  async create(create: CreateUserDto) {
    const phoneNumber = create.phoneNumber;
    const user = this.userRepository.create({
      phoneNumber: phoneNumber,
    });
    await this.userRepository.save(user);

    console.log(user);
    const authCode = await this.authCodeRepository.findOne({
      where: { user: user },
    });

    if (authCode) this.authCodeRepository.softDelete(authCode.id);
    const newAuthCode = this.authCodeRepository.create({
      user: user,
      code: String(Math.floor(Math.random() * 1000000)).padStart(6, '0'),
    });
    await this.authCodeRepository.save(newAuthCode);

    return plainToInstance(ResponseUserDto, newAuthCode, {
      excludeExtraneousValues: true,
    });
  }

  async auth(auth: AuthCodeDto) {
    const phoneNumber = auth.phoneNumber;
    const code = auth.code;

    const currentDate = new Date();
    const fiveMinuteAgo = new Date();
    fiveMinuteAgo.setMinutes(currentDate.getMinutes() - 5);
    const userData = await this.userRepository.findOne({
      where: { phoneNumber: phoneNumber },
    });
    const user = this.userRepository.create({
      phoneNumber: userData.phoneNumber,
    });

    if (!user)
      throw new NotFoundException('등록되어 있지 않은 전화번호 입니다.');
    const test = await this.authCodeRepository.find({ where: { user: user } });
    console.log(test);
    const authCode = await this.authCodeRepository.findOne({
      where: { user: user, createdAt: Between(fiveMinuteAgo, currentDate) },
    });
    if (!authCode) {
      throw new NotFoundException(
        '인증번호가 없습니다. 인증 요청 후 다시 시도해주세요.',
      );
    }
    if (code != authCode.code) {
      throw new BadRequestException(
        '잘못된 인증번호 입니다. 정확한 인증번호로 다시 요청해주세요.',
      );
    }

    await this.authCodeRepository.softDelete(authCode.id);
    return plainToInstance(ResponseAuthCodeDto, { result: true });
  }
}
