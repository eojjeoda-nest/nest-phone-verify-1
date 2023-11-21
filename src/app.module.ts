import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { PhoneVerifyController } from './modules/phone-verify/phone-verify.controller';
import { PhoneVerifyService } from './modules/phone-verify/phone-verify.service';
import { PhoneVerifyModule } from './modules/phone-verify/phone-verify.module';
import { PhoneVerify } from './modules/phone-verify/entity/phoneVerify';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'mysql',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: [PhoneVerify],
          synchronize: process.env.DB_SYNC === 'true',
          timezone: 'Z',
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    PhoneVerifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
