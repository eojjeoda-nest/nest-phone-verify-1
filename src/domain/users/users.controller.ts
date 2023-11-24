import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, ResponseUserDto } from './dto/users.dto';
import { AuthCodeDto, ResponseAuthCodeDto } from './dto/auth-codes.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/users')
@ApiTags('유저 API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: '전화번호 등록 API ' })
  @ApiCreatedResponse({
    description: '전회번호를 등록한다.',
    type: ResponseUserDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('auth')
  @ApiOperation({ summary: '인증 API ' })
  @ApiCreatedResponse({
    description: '전회번호로 발송된 인증번호를 통해 인증을 진행한다.',
    type: ResponseAuthCodeDto,
  })
  auth(@Body() authCodeDto: AuthCodeDto) {
    return this.usersService.auth(authCodeDto);
  }
}
