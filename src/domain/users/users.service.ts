import { Injectable } from '@nestjs/common';
import { CreateUserDto, ResponseUserDto } from './dto/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthCode } from './entities/auth-code.entity';
import { plainToInstance } from 'class-transformer';

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
}
