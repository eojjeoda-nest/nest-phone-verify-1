import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthCode } from './entities/auth-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, AuthCode])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
