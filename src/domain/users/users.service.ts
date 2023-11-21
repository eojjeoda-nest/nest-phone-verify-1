import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(create: CreateUserDto) {
    const a = create;
    return 'fdsa';
  }
}
