import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import { AuthCodeDto } from './dto/auth-codes.dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('auth')
  auth(@Body() authCodeDto: AuthCodeDto) {
    return this.usersService.auth(authCodeDto);
  }
}
